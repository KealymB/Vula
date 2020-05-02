import * as React from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';

import { setTool } from '../actions/data';
  
var arr=[]
var elements=[];

function Side(data, prop) {
  if(data.data.currSite.tools!=undefined){arr=data.data.currSite.tools}
  elements=[]
  for(var i=0;i<arr.length;i++){
    elements.push(
      <Button 
        color='black'
        key={i}
        title={(arr[i]).title}
        onPress={()=>{prop.setTool(arr[i].id)}}
      />
    );
  }

  return (
    <View>
      {elements}
    </View>
  );
}

class SideBar extends Component {
    render(){
        return(
          <View style={styles.container}>
            <Side data={this.props.currSite} prop={this.props} />
          </View>
        );
    }
}  

const mapStateToProps = (state) => {
  return{
    currSite:state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTool: (curTool) => dispatch(setTool(curTool))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    backgroundColor: '#1f4166',
  },
})