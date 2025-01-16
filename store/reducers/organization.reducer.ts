import { createSlice } from "@reduxjs/toolkit";
import { MultipleElements } from "services/generical.service";
import { CompleteOrganization } from "services/Organization/organization.service";

interface InitialStateProps{
    organizationList: MultipleElements<CompleteOrganization> | null
    organization:CompleteOrganization | null
    loading:boolean
}


const initialState:InitialStateProps = {
    organizationList: null,
    organization:null,
    loading:false
};

export const OrganizationAction = createSlice({
  name: "Organizations",
  initialState,
  reducers: {
    oneOrganization:(state,action)=>{
        state.organization=action.payload
    },
    setLoading:(state,action)=>{
        state.loading=action.payload
    }
  },
});

export const { oneOrganization,setLoading } = OrganizationAction.actions;

export default OrganizationAction.reducer;
