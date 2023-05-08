import React, { useContext, useState } from 'react'
import "./newProduct.css"
import { MovieContext } from '../../context/movieContext/movieContext';
import { createMovie } from '../../context/movieContext/apiCalls';
import storage from '../../firebase';
import UserLayout from './../../layout/UserLayout';
import { getDownloadURL, ref,uploadBytes } from 'firebase/storage';

const NewProduct = () => {


  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [movie, setMovie] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  // console.log(movie, uploaded);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    // console.log(value)
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  }

  const upload = (items) => {

    
    //filtering out the array so that it doesnt pass null value to the next component 
    // console.log(items);
    const item_list = items.filter((each) => each.file !== null);
    // console.log(item_list)
    item_list.forEach(async (item) => {
      if (item.file !== null) {
      
        const fileName = new Date().getTime() + item.label + item.file.name;
        // console.log(item.file.name);
        
        const storageRef = ref(storage, `/items/${fileName}`);
        const uploadTask = uploadBytes(storageRef, item.file);
        // console.log(uploadTask);
        
      
        await uploadTask.then((snapshot) => {
          const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          // console.log("upload finished");
          // console.log(snapshot.ref);
        },
          (err) => {
            console.log(err);
          },
        );
        const set = () => {

          getDownloadURL(ref(storage, `/items/${fileName}`))
            .then((url) => {
              console.log("file is available at", url);
              
              setMovie((prev) => {
                console.log(prev);
                return { ...prev, [item.label]: url };
              });
              setUploaded((prev) => prev + 1);
              // console.log(movie, uploaded);
              
            }
            );
            
            
        }
        set();

      }
    })
  }

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {
        file: img,
        label: "img"
      },
      {
        file: imgTitle,
        label: "imgTitle"
      },
      {
        file: imgSm,
        label: "imgSm"
      },
      {
        file: trailer,
        label: "trailer"
      },
      {
        file: video,
        label: "video"
      },
    ]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  }
  return (
    <>
      <div className="newProduct">
        <h1 className="addProductTitle">New Movie</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file" id="file" name='img' onChange={(e) => setImg(e.target.files[0])}
            />
          </div>

          <div className="addProductItem">
            <label>Title Image </label>
            <input type="file" id="imgTitle" name="imgTitle" onChange={(e) => setImgTitle(e.target.files[0])} />
          </div>


          <div className="addProductItem">
            <label>ThumbNail Image</label>
            <input type="file" id="imgSm" name="imgSm" onChange={(e) => setImgSm(e.target.files[0])} />
          </div>


          <div className="addProductItem">
            <label>Title</label>
            <input type="text"
              placeholder="John Wick"
              name="title"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Description</label>
            <input type="text"
              placeholder="description"
              name="desc"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Year</label>
            <input type="text"
              placeholder="year"
              name="year"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Genre</label>
            <input type="text"
              placeholder="genre"
              name="genre"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Duration</label>
            <input type="text"
              placeholder="Duration"
              name="duration"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Limit</label>
            <input type="text"
              placeholder="limit"
              name="limit"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries" onChange={handleChange} >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            
          </div>

          <div className="addProductItem">
            <label htmlFor="">Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])} />
          </div>


          <div className="addProductItem">
            <label htmlFor="">Video</label>
            <input type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>

          {uploaded === 5 ? (
            <button className="addProductButton" onClick={handleSubmit}>Create</button>
          ) : (
            <button className="addProductButton" onClick={handleUpload}>Upload</button>
          )}

        </form>
      </div>
    </>
  )
}

// export default DefaultLayout(NewProduct);
export default UserLayout(NewProduct);