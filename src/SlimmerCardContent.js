import { CardContent, Typography } from "@mui/material";

function SlimmerCardContent({ children }) {
  return (
    <CardContent sx={{ padding: "8px", marginBottom: "-12px" }}>
      <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
        {children}
      </Typography>
    </CardContent>
  );
}

export default SlimmerCardContent;
