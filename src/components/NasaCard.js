import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function NasaCard(props) {
  const { copyright, date, explanation, title, url, avatarBgColor, index } =
    props.cardData;
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem(`${index}`);
    const initialValue = JSON.parse(saved);
    if (initialValue && initialValue.id === index) {
      return initialValue.liked || false;
    } else {
      return false;
    }
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    localStorage.setItem(
      `${index}`,
      JSON.stringify({ id: index, liked: !liked })
    );
  };

  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  let initials = [];
  if (copyright !== undefined) {
    initials = [...copyright.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();
  }

  return (
    <Card sx={{ maxWidth: 690 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: avatarBgColor }} aria-label="recipe">
            {initials}
          </Avatar>
        }
        title={
          copyright
            ? copyright.length < 30
              ? copyright
              : `${copyright.substring(30)}...`
            : ""
        }
        subheader={date}
      />
      <CardMedia component="img" height="388" image={url} alt={title} />
      {expanded ? (
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {explanation}
            </Typography>
          </CardContent>
        </Collapse>
      ) : (
        <CardContent>
          <Typography variant="body2" color="text.secondary" noWrap>
            {explanation}
          </Typography>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon sx={{ color: `${liked ? red[500] : ""}` }} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}

export default NasaCard;
