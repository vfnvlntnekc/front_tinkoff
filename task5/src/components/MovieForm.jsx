import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Select } from 'antd';

const MovieForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/movies/${id}`);
        setMovie(response.data);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await axios.put(`http://localhost:3001/movies/${id}`, values);
      } else {
        await axios.post('http://localhost:3001/movies', values);
      }
      navigate('/movies');
    } catch (error) {
      console.error('Error submitting movie:', error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={movie}
    >
      <Form.Item label="Id" name="id" rules={[{ required: true, message: 'Please enter the id' }]}>
        <Input type="text" name="id" />
      </Form.Item>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title' }]}>
        <Input type="text" name="title" />
      </Form.Item>
      <Form.Item label="Year" name="year">
        <Input type="text" name="year" />
      </Form.Item>
      <Form.Item label="Runtime" name="runtime">
        <Input type="text" name="runtime" />
      </Form.Item>
      <Form.Item label="Genres" name="genres">
        <Select mode="multiple" placeholder="Select genres">
          {[
            "Comedy",
            "Fantasy",
            "Crime",
            "Drama",
            "Music",
            "Adventure",
            "History",
            "Thriller",
            "Animation",
            "Family",
            "Mystery",
            "Biography",
            "Action",
            "Film-Noir",
            "Romance",
            "Sci-Fi",
            "War",
            "Western",
            "Horror",
            "Musical",
            "Sport"
          ].map(genre => (
            <Select.Option key={genre} value={genre}>{genre}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Director" name="director">
        <Input type="text" name="director" />
      </Form.Item>
      <Form.Item label="Actors" name="actors">
        <Input type="text" name="actors" />
      </Form.Item>
      <Form.Item label="Plot" name="plot">
        <Input.TextArea name="plot" />
      </Form.Item>
      <Form.Item label="Poster URL" name="posterUrl">
        <Input type="text" name="posterUrl" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MovieForm;
