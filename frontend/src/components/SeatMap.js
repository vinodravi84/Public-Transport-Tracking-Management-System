// src/components/SeatMap.jsx
import React, { useMemo } from "react";
import { Box, Grid, Button } from "@mui/material";

/**
 * SeatMap props:
 * - capacity (number)
 * - reserved: array of seat numbers already booked (e.g. [1,2,10])
 * - selected: array of selected seat numbers
 * - onToggle(seatNumber)
 *
 * Layout: rows of 4 seats (2x2 with an aisle)
 */
export default function SeatMap({ capacity, reserved = [], selected = [], onToggle }) {
  const seats = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= capacity; i++) arr.push(i);
    return arr;
  }, [capacity]);

  const renderSeat = (num) => {
    const isReserved = reserved.includes(num);
    const isSelected = selected.includes(num);

    return (
      <Button
        key={num}
        onClick={() => !isReserved && onToggle(num)}
        variant={isSelected ? "contained" : "outlined"}
        disabled={isReserved}
        size="small"
        sx={{
          minWidth: 44,
          minHeight: 44,
          m: 0.5,
          bgcolor: isReserved ? "grey.300" : isSelected ? "primary.main" : "transparent",
          color: isReserved ? "text.disabled" : isSelected ? "white" : "text.primary",
          borderColor: "grey.400"
        }}
      >
        {num}
      </Button>
    );
  };

  // Create rows - 4 seats per row but show 2 + aisle + 2
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <Box>
      {rows.map((row, idx) => (
        <Grid container key={idx} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs="auto">
            <Box display="flex">{row.slice(0, 2).map(renderSeat)}</Box>
          </Grid>

          {/* aisle */}
          <Grid item xs>
            <Box textAlign="center" color="text.secondary">aisle</Box>
          </Grid>

          <Grid item xs="auto">
            <Box display="flex" justifyContent="flex-end">{row.slice(2, 4).map(renderSeat)}</Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
