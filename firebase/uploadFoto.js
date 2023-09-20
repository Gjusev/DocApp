import { getStorage,getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// Initialize Firebase Storage
const storage = getStorage();

const uploadPhoto = async (photoFile) => {
  try {
    // Generate a unique filename (you can use your own logic for this)
    const filename = `${Date.now()}_${photoFile.name}`;

    // Create a reference to the storage bucket and file
    const storageRef = ref(storage, `photos/${filename}`);

    // Upload the photo
    const snapshot = await uploadBytes(storageRef, photoFile);

    // Get the download URL for the uploaded photo
    const downloadURL = await getDownloadURL(storageRef); // Use getDownloadURL with storageRef
    console.log('Photo uploaded successfully: ', downloadURL)
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return null; // You might want to handle this differently in a real application
  }
};

export default uploadPhoto;
