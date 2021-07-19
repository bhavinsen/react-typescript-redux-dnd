import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from "uuid";
import "./App.style.css";
import Droppable from "./Droppable/index";

const itemsFromBackend = [
  { id: v4(), content: "First task" },
  { id: v4(), content: "Second task" },
  { id: v4(), content: "Third task" },
  { id: v4(), content: "Fourth task" },
  { id: v4(), content: "Fifth task" }
];

const columnsFromBackend = {
  [v4()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [v4()]: {
    name: "To do",
    items: []
  },
  [v4()]: {
    name: "In Progress",
    items: []
  },
  [v4()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);


  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable columnId={columnId} column={column} />
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
