import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography } from "@mui/material";

export default function AnimatedCard({ title, content }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
