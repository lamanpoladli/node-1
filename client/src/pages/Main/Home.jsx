import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useEffect, useState } from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Space, Col, Row } from 'antd';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Home = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/products")
        .then(res => res.json())
        .then(data => {
            setPhotos(data)

        })
}, [])
  function handleDelete(id) {
    if(window.confirm("Are you sure?")){
      fetch(`http://localhost:8080/products/${id}`,{
      method:"DELETE",
    })
    setPhotos(photos.filter((photo)=>photo.id!==id))
    }
        
  }
  return (
    <Space direction="vertical" size={16}>
      <Row style={{display:"flex",flexWrap:"wrap",gap:"40px",margin:"0 auto",width:"70%"}}>{photos &&
    photos.map((elem) => (
      <Col span={6} style={{ marginBottom: "20px",marginTop: "20px" ,width:"300px"}} key={elem.id}>
    <Card sx={{ maxWidth: 450 }}>
      <CardHeader
       
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={elem.name}

      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {elem.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <button onClick={()=>handleDelete(elem.id)}>Delete</button>
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
    </Col>
    ))
      }</Row>
    </Space>
  )
}

export default Home