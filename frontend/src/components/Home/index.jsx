import React, { useState, useEffect } from "react";
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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setComments } from "../redux/reducers/posts";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { MdComment } from "react-icons/md";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

// ----------------------------------------------
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Home() {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const { token, posts, pfp, userId } = useSelector((state) => {
    return {
      token: state.auth.token,
      userId: state.auth.userId,
      pfp: state.auth.pfp,
      posts: state.posts.posts,
    };
  });
  const [expanded, setExpanded] = useState(false);
  const BACKEND = process.env.REACT_APP_BACKEND;

  // ---------------------------------------
  const getPosts = async () => {
    try {
      const result = await axios.get(`${BACKEND}/posts/following/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data.success) {
        dispatch(setPosts(result.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(error.response.data.message);
      }
      console.log("Error happened while Get Data, please try again");
    }
  };

  const getCommentsForPost = async (id) => {
    try {
      const result = await axios.get(`${BACKEND}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.data.success) {
        const comments = result.data.result;
        console.log(comments);
        dispatch(
          setComments({
            comments,
            post_id: id,
          })
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleExpandClick = (id) => {
    return () => {
      if (expanded) {
        setExpanded(false);
      } else {
        setExpanded(id);
        getCommentsForPost(id);
      }
    };
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {" "}
      <div className="new-post">x</div>
      <div className="feed">
        <Container>
          {posts.map((post) => {
            return (
              <Card key={post.post_id} sx={{ margin: "10px 0" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      src={post.user_img}
                      aria-label="recipe"
                    ></Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post.user_first_name}
                  subheader={post.post_created_at}
                />

                <CardMedia
                  component="img"
                  // height="194"
                  image={post.post_img}
                  alt="post"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.post_description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>

                  <ExpandMore
                    expand={expanded === post.post_id}
                    onClick={handleExpandClick(post.post_id)}
                    aria-expanded={expanded === post.post_id}
                    aria-label="show more"
                  >
                    <MdComment />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expanded === post.post_id}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <Avatar
                        style={{ height: "55px", width: "55px" }}
                        alt="user"
                        src={pfp}
                      />
                      <TextField
                        onChange={(e) => {
                          e.preventDefault();
                          setComment(e.target.value);
                        }}
                        style={{ margin: "0 10px", width: "85%" }}
                        id="outlined-basic"
                        label="Add a comment..."
                        variant="outlined"
                      />
                      <Button variant="contained" endIcon={<SendIcon />}>
                        Send
                      </Button>
                    </div>
                    <div>
                      {post.comments ? (
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          {post.comments.map((comment) => {
                            return (
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar src={comment.img} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={comment.comment}
                                  secondary={comment.created_at}
                                />
                              </ListItem>
                            );
                          })}
                        </List>
                      ) : (
                        <>
                          <h4>No comments Yet</h4>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Collapse>
              </Card>
            );
          })}
        </Container>
      </div>
    </div>
  );
}
