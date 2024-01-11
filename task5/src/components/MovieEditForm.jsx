import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const MovieEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: '',
    year: '',
    runtime: '',
    genres: [],
    director: '',
    actors: '',
    plot: '',
    posterUrl: '',
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const [form] = Form.useForm();

  const handleCancel = () => {
    navigate(`/movies/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/movies/${id}`, movie);
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Id" name="id">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Title" name="title" >
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Year" name="year">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Runtime" name="runtime">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Genres" name="genres">
        <Select mode="multiple" allowClear onChange={(values) => setMovie((prevMovie) => ({ ...prevMovie, genres: values }))}>
          {["Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure", "History", "Thriller", "Animation", "Family", "Mystery", "Biography", "Action", "Film-Noir", "Romance", "Sci-Fi", "War", "Western", "Horror", "Musical", "Sport"].map(genre => (
            <Option key={genre} value={genre}>{genre}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Director" name="director">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Actors" name="actors">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Plot" name="plot">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Image" name="posterUrl">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Rating" name="rating">
        <Input onChange={handleChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleUpdate}>
          Save
        </Button>
        <Button onClick={handleCancel} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MovieEditForm;
