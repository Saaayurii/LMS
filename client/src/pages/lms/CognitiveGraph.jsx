import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { 
  Expand, Shrink, RefreshCw, Info, 
  Network, BrainCircuit, GitFork, Link2 
} from "lucide-react";
import * as d3 from 'd3';

export const CognitiveGraph = ({ data }) => {
  const svgRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 800;
    const height = 600;
    
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .call(d3.zoom().on("zoom", (event) => {
        svg.attr("transform", event.transform);
        setZoomLevel(event.transform.k);
      }));

    // Очистка предыдущего графа
    svg.selectAll("*").remove();

    // Создание симуляции
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width/2, height/2));

    // Обработка данных
    const nodes = data.map(model => ({
      id: model.id,
      type: model.type,
      label: model.name,
      ...model
    }));

    const links = data.flatMap(model => 
      model.relationships.map(rel => ({
        source: model.id,
        target: rel.targetId,
        type: rel.type
      }))
    );

    // Рисуем связи
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("path")
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .attr("stroke-dasharray", d => d.type === 'hierarchical' ? "5,5" : "0");

    // Рисуем узлы
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter().append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Иконки узлов
    node.append("circle")
      .attr("r", 24)
      .attr("fill", d => {
        switch(d.type) {
          case 'conceptual': return '#60a5fa';
          case 'procedural': return '#34d399';
          default: return '#f472b6';
        }
      })
      .on("mouseover", (event, d) => {
        setSelectedNode(d);
        d3.select(event.currentTarget)
          .transition().duration(200)
          .attr("r", 28);
      })
      .on("mouseout", (event) => {
        setSelectedNode(null);
        d3.select(event.currentTarget)
          .transition().duration(200)
          .attr("r", 24);
      });

    // Текстовые метки
    node.append("text")
      .text(d => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", 35)
      .attr("fill", "#1e293b")
      .style("font-size", "12px")
      .style("pointer-events", "none");

    // Обновление симуляции
    simulation.nodes(nodes).on("tick", ticked);
    simulation.force("link").links(links);

    function ticked() {
      link.attr("d", d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [data]);

  return (
    <div className="relative border rounded-lg bg-background h-[600px]">
      {/* Панель управления */}
      <div className="absolute top-2 right-2 flex gap-2 bg-background p-2 rounded-lg shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setZoomLevel(1)}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Сбросить вид</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setZoomLevel(prev => prev * 1.1)}>
              <Expand className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Увеличить</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setZoomLevel(prev => prev * 0.9)}>
              <Shrink className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Уменьшить</TooltipContent>
        </Tooltip>
      </div>

      {/* Легенда */}
      <div className="absolute bottom-2 left-2 bg-background p-3 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <Network className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Легенда:</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#60a5fa]" />
            <span className="text-xs">Концептуальные</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#34d399]" />
            <span className="text-xs">Процедурные</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f472b6]" />
            <span className="text-xs">Другие</span>
          </div>
        </div>
      </div>

      {/* Информация о узле */}
      {selectedNode && (
        <div className="absolute top-2 left-2 bg-background p-4 rounded-lg shadow-sm max-w-xs">
          <h4 className="font-medium flex items-center gap-2 mb-2">
            <BrainCircuit className="h-4 w-4" />
            {selectedNode.label}
          </h4>
          <div className="text-sm space-y-1">
            <p><span className="text-muted-foreground">Тип:</span> {selectedNode.type}</p>
            {selectedNode.components?.length > 0 && (
              <p><span className="text-muted-foreground">Компоненты:</span> {selectedNode.components.join(', ')}</p>
            )}
          </div>
        </div>
      )}

      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default CognitiveGraph;