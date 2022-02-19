import React from 'react';
import * as d3 from 'd3';
import useD3  from 'hooks/useD3';
import { schemeBrBG } from 'd3';
import * as RecordStore from "dataModel/recordStore";
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
  } from 'react-native-svg';

function LineChart({ data }){
    console.log(data);
    const ref = useD3(
        (svg)=>{
            const height = 500;
            const width = 500;
            const margin = {top:20, right:30, bottom:30, left:40};

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d["date"]))
                .rangeRound([margin.left, width - margin.right])
                .padding(0.1);
            const y = d3
                .scaleLinear()
                .domain(data.map((d) => d["weight"]))
                .rangeRound([height - margin.bottom, margin.top]);
            

                const xAxis = (g) =>
                    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
                    d3
                        .axisBottom(x)
                        .tickValues(
                        d3
                            .ticks(...d3.extent(x.domain()), width / 40)
                            .filter((v) => x(v) !== undefined)
                        )
                        .tickSizeOuter(0)
                    );
                const y1Axis = (g) =>
                    g
                    .attr("transform", `translate(${margin.left},0)`)
                    .style("color", "steelblue")
                    .call(d3.axisLeft(y).ticks(null, "s"))
                    .call((g) => g.select(".domain").remove())
                    .call((g) =>
                        g
                        .append("text")
                        .attr("x", -margin.left)
                        .attr("y", 10)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .text("weight")
                    );
                svg.select(".x-axis").call(xAxis);
                svg.select(".y-axis").call(y1Axis);
            // const xAxis = d3.svg.axis().scale(x) 
            //     .orient("bottom") 
            //     .ticks(6) 
            // const yAxis = d3.svg.axis().scale(y)
            //     .orient("left") 
            //     .ticks(6) 
            // svg.append('G').attr('class', 'axis') 
            //     .attr('transform', `translate(0,${height - margin.bottom})`) 
            //     .call(xAxis); 
            // svg.append('G').attr('class', 'axis')
            //     .attr('transform', `translate(${margin.left}, 0)`) 
            //     .call(yAxis);
                
            
            svg
                .select(".plot-area")
                .attr("fill", "steelblue")
                .selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .attr("x",  (d) => x(d.date))
                .attr("width", x.bandwidth())
                .attr("y", (d) => y(d.weight))
                .attr("height", (d) => y(0) - y(d.weight));
        },
        [data.length]
    );
    
    return (
    <Svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <G className="plot-area" />
    </Svg>
    );
}

export default LineChart;