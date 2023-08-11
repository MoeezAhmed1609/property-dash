import React, { useState } from 'react'
import { db, storage } from '../../../Config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

export default function AddNew() {

    const [Name, setName] = useState();
    const [City, setCity] = useState();
    const [Desc, setDesc] = useState();
    const [Desig, setDesig] = useState();
    const [Image, setImage] = useState();
    const [Team,setTeam] = useState();


    const HandleSubmitTeamForm = async (e) => {
        e.preventDefault()
        const storageRef = ref(storage, `TeamImages/${Image.name}`);
        await uploadBytes(storageRef, Image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        await getDownloadURL(ref(storage, storageRef))
            .then(async (url) => {
                // Add a new document with a generated id.
                const docRef = await addDoc(collection(db, "Team"), {
                    name: Name,
                    City,
                    Desc,
                    Desig,
                    img:url,
                    Team

                });
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                // Handle any errors
            });

    }



    return (
        <div class="container">
            <h2>Add New Team Member</h2>
            <form id="teamMemberForm" onSubmit={HandleSubmitTeamForm}>
                <div class="form-group">
                    <label for="memberName">Member Name</label>
                    <input onChange={(e)=>setName(e.target.value)} type="text" id="memberName" name="memberName" required />
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input  onChange={(e)=>setCity(e.target.value)}  type="text" id="city" name="city" required />
                </div>
                <div class="form-group">
                    <label for="city">Designation</label>
                    <input  onChange={(e)=>setDesig(e.target.value)}  type="text" id="city" name="city" required />
                </div>
                
                <div class="form-group">
                    <label for="city">Team Group</label>
                    <input  onChange={(e)=>setTeam(e.target.value)}  type="text" id="city" name="city" required />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea onChange={(e)=>setDesc(e.target.value)} id="description" name="description" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="imageUpload">Upload Image</label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="imageUpload" name="imageUpload" accept="image/*" />
                    <label class="custom-file-upload" for="imageUpload">Choose File</label>
                    <span class="file-name"></span>
                </div>
                <div class="form-submit">
                    <button type="submit">Add Member</button>
                </div>
            </form>
        </div>
    )
}
