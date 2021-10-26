import React,{useState , useEffect} from "react";

import './../../css/Experience.css'
import './../../css/Utilities.css'

import { MdSettings, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {
  Box,
  Flex,
  Heading,
  Text,
  OrderedList,
  ListItem,
  Button,
  
} from "@chakra-ui/react";

import { GetAllTeams } from '../../api/AjaxApi';
import GetTeamsData from '../../global/GetTeamsData';

const Experience = ({ onClickExperience=_=>{} }) => {
  const [teams,setTeams] = useState([])
  
  const getAllTeams = async()=>{
    console.log("experience_teams = ")
    let teams = await GetAllTeams()
    console.log("experience_teams = ",teams)
    setTeams(teams)
  }

  useEffect(()=>{
    getAllTeams()
    console.log("teams_getallteams =  ",teams)
  },[])

  return (
    <Box
      m="55px"
      borderWidth="2px"
      borderColor="gray.100"
      borderRadius="15px"
      p="48px"
      fontWeight="400"
    >
      <Flex flexDirection="column">
        <Heading
          fontWeight="400"
          fontSize="32px"
          pb="10px"
          borderBottomWidth="2px"
          borderBottomColor="gray.100"
          color="black"
        >
          Launch a New Experience
        </Heading>
        <Box mt="45px">
          <Text fontSize="28px" pb="18px">
            How to create Experience ?{" "}
          </Text>
          <OrderedList fontSize="18px" mb="26px">
            <ListItem>Create or delete Teams accordingly.</ListItem>
            <ListItem>
              Can change Team name, colour or max players allowed in any Team.
            </ListItem>
            <ListItem>To Launch Experience Click Launch Button.</ListItem>
          </OrderedList>
        </Box>
        <Text fontSize="28px" pb="14px">
          Manage Teams
        </Text>
        <Flex flexDirection="column" pb="91px">
          <Box pb="23px" display="flex" justifyContent="flex-end">
            {" "}
            <Button
              leftIcon={<IoMdAdd style={{ fontSize: "1.5rem" }} />}
              color="#000"
              bgColor="blue.300"
              variant="solid"
              fontWeight="400"
              w="180px"
              h="40px"
              borderRadius="10px"
            >
              Add Team
            </Button>
          </Box>
          <table style={{ width: "100%", fontSize: "18px" }}>
            <thead style={{ height: "50px" }}>
              <tr
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  backgroundColor: "#E9EFFB",
                  textAlign:'center'
                }}
              >
                <th>No.</th>
                <th>Team Name</th>
                <th>Icon</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                (teams || []).map((obj,index)=>{
                  let teamData = GetTeamsData('name',obj.team_name.toLowerCase())
                    return (
                      <tr style={{ textAlign: "center" }} key={index+1+Math.random()}>
                        <td>{index+1}</td>
                        <td style={{textTransform:'capitalize'}}>{teamData.name || obj.team_name}</td>
                        <td>
                          <img style={{ margin: "auto" }} src={teamData.icon || obj.team_icon} alt={teamData.name} style={{width:60}} />
                        </td>
                        <td>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: teamData.color || obj.team_color,
                              margin: "auto",
                            }}
                          ></div>
                        </td>
                        <td>
                          <div className="tooltip">
                            <MdSettings className="setting-icon" />
                            <div className="tooltip-block">
                              <div className="tooltip-edit">
                                <FaRegEdit className="tooltip-icon" />
                                Edit
                              </div>
                              <div className="tooltip-delete">
                                <MdDelete className="tooltip-icon" />
                                Delete
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                })
              }
             
            
            </tbody>
          </table>
        </Flex>
        <Button
          onClick={onClickExperience}
          color="#000"//temporary changer from white to black
          bgColor="blue.300"
          variant="solid"
          w="304px"
          borderRadius="10px"
          fontSize="22px"
          height="61px"
          fontWeight="400"
        >
          Launch Experience
        </Button>
      </Flex>
    </Box>
  );
};

export default Experience
