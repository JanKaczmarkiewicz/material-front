import React from "react";
import {
  makeStyles,
  Typography,
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
} from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345
  },
});

export interface Props {
  title: string;
  image: string;
  url: string;
}

const AddCard: React.FC<Props> = ({ title, image, url }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`data/${url}`}>
        <CardMedia
          component="img"
          alt={title}
          height={140}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddCard;
