import React, { useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Divider,
  Box,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";


function DraggableItem({ el, index }) {
  return (
    <Draggable key={el.id} index={index} draggableId={el.id}>
      {(provided, snapshot) => {
        return (
          <Box
            sx={{
              marginBottom: "10px",
              color: "black",
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {el.name}
          </Box>
        );
      }}
    </Draggable>
  );
}

function DroppableCard({ data, droppableId }) {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          {data.items.map((el, index) => {
            return <DraggableItem el={el} index={index} key={index} />;
          })}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
}

export default function TodoCards() {
  const item1 = {
    id: "abc",
    name: "Clean the house",
  };
  const item2 = {
    id: "def",
    name: "Learn react-beautiful-dnd",
  };
  const item3 = {
    id: "ghi",
    name: "Eat lunch",
  };

  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [item1],
    },
    "in-progress": {
      title: "In Progress",
      items: [item2, item3],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    // Item dropped outside a droppable container
    if (!destination) {
      console.log("not dropped in a droppable");
      return;
    }

    // Item dropped in same place in the same droppable container
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log("dropped in same place in droppable container");
      return;
    }

    // Copy of the dragged item before removing it from state
    const copyItem = { ...state[source.droppableId].items[source.index] };

    //Updating state
    setState((prev) => {
      prev = { ...prev };

      // Removing dragged item from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding dragged item to new array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        copyItem
      );

      return prev;
    });
  };

  return (
    <Grid
    container
    spacing={4}
        justifyContent="center"
        mt="10px"
        textAlign="center"
        paddingLeft={5}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <Grid item key={key}>
                <Paper
                  sx={{
                    height: 500,
                    width: 300,
                  }}
                  elevation={8}
                >
                  <Typography variant="h4">{data.title}</Typography>
                  <Divider />
                  <DroppableCard data={data} droppableId={key} />
                </Paper>
              </Grid>
            );
          })}
        </DragDropContext>
      </Grid>
  );
}
