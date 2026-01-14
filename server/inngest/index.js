import { Inngest } from "inngest";
import prisma from "../configs/prisma";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "project-management" });
// Inngest function to sync user from clerk to database
const syncUserFunction = inngest.createFunction(
    {
        id: 'sync-user-from-clerK'},
        {event: "clerk.user.created"} ,
    async ({ event, step }) => {
const {data} = event;
await prisma.user.create({

data:{
    id: data.id,
email: data.email_addresses[0]?.email_address ,
name: data.first_name + " " + data.last_name,
image:data?.image_url,
}
})

    }
)

//inngest function to delete userfrom db

const syncDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerK'},
        {event: "clerk.user.deleted"} ,
    async ({ event, step }) => {
const {data} = event;
await prisma.user.delete({
    where: {
        id: data.id
    }
})
    

    }
)

//inngest function to update userfrom db                    
const syncUserUpdation= inngest.createFunction(
    {
        id: 'update-user-from-clerk'},
        {event: "clerk.user.updated"} ,
    async ({ event, step }) => {
const {data} = event;
await prisma.user.update({
    where: {
        id: data.id
    },
    data: {
        email: data.email_addresses[0]?.email_address,
        name: data.first_name + " " + data.last_name,
        image:data?.image_url,
    }
})

    }
)

    // Create an empty array where we'll export future Inngest functions
export const functions = [syncUserFunction,
     syncDeletion, syncUserUpdation
   ];


