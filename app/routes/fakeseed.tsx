import { notedb } from "~/comp/prisma.server";
import { LoaderFunction } from "@remix-run/node";
import { fakerEN_US as faker } from '@faker-js/faker';

// Function to seed the database with fake note data
async function seed() {
    // Create a new note with random data
    const addnote = await notedb.notes.create({
        data: {
            noteid: faker.string.nanoid(8), // Generate a random note ID
            title: faker.lorem.sentence({ min: 5, max: 18 }), // Generate a random title
            content: faker.lorem.paragraphs({ min: 3, max: 16 }, '/n'), // Generate random content
            crDate: faker.date.recent(), // Generate a random past date for creation date
            upDate: faker.date.recent(), // Generate a random recent date for update date
            stared: faker.datatype.boolean(), // Generate a random boolean for stared status
        }
    });
    console.log(addnote); // Log the created note to the console
}

// Loader function to seed the database with multiple notes
export const loader: LoaderFunction = async () => {
    for (let count = 0; count < 5; count++) {
        await seed(); // Call the seed function to add a note
    }
    return null; // Return null to indicate the loader has finished
};
