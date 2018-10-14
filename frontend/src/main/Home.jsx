import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Typography from '@material-ui/core/Typography';


class Home extends Component {
  state = {
  }
  componentDidMount(){
    document.body.style.backgroundColor = '#4db6ac'// Set the style
  }
  render() {
    return (
        
        <Grid>
            <Row>
                <Col xs={6} md={3}>
                    <Typography variant="title" gutterBottom>
                        Welcome to Mobsteer
                    </Typography>
                    
                </Col>
            </Row>
            <Row>
              <Col xs={12}>
                
              
              </Col>
              <Row>
                <Col xs={12}>
                  
                    
                  
                    
                  
                </Col>
              </Row>
          
            </Row>
            
        </Grid>
        
        
    )
  }
}
Home.propTypes = {
  
};
export default Home;