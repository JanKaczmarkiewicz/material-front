import React from "react";
import {
  CardActionArea,
  CardMedia,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

interface Props {
  title: string;
  image: string;
  secondary: string;
}

const PathCard: React.FC<Props> = ({ title, image, secondary }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height={300}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {secondary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PathCard;
