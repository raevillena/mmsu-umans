import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Avatar,
  CircularProgress
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import fileUpload from "../../utils/fileUpload";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../../store/slices/usersSlice";
import { updateAvatar } from "../../store/actions/userShared";

const avatarURL=import.meta.env.VITE_IMAGE_SERVER_URL

const ProfileAvatarCard = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user) || null

    //File uploading
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleUploadClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  
    const handleSubmit = async () => {
      if (!file) return;
  
      try {
        const upload = await fileUpload(file, '/upload', setLoading, dispatch);
        dispatch(updateUser({id: user.id , data:{ avatar: upload.filePath }}));
        dispatch(updateAvatar(upload.filePath));
      } catch (error) {
        console.error('Upload error:', error);
      }
    };

    return (
    <div>
        <Card sx={{ boxShadow: 3, backgroundColor: "#ffffff", p: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                User Information
              </Typography>

              <Avatar
                src={`${avatarURL}${user?.avatar}`}
                alt="User Avatar"
                sx={{ width: 120, height: 120, mb: 1, border: '2px solid#c1c1c1', boxShadow:2}}
              />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <Button variant="outlined" onClick={handleUploadClick}>
                    Choose File
                </Button>
                {file && <Typography variant="body2">{file.name}</Typography>}
                <div>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!file || loading}
                      >
                            Upload
                        </Button>
                    )}
                </div>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body1">
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Mobile:</strong> {user.mobileNo}
                </Typography>
                <Typography variant="body1">
                  <strong>Role:</strong> {user.role} 
                </Typography>
              </Box>
            </CardContent>
          </Card>
    </div>
    )
}

export default ProfileAvatarCard
