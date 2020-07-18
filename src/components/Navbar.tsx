import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  seed: Array<{
    icon: JSX.Element;
    text: string;
    link: string;
  }>;
}

const Navbar: React.FC<Props> = ({ seed }) => (
  <nav>
    {seed.map(({ icon: Icon, text, link }) => (
      <ListItem button component={Link} to={link} key={`navitem-${text}`}>
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </nav>
);
export default Navbar;
