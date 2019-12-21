import React, { useState } from "react";
import { Form, Input, Tooltip, Icon, Button } from "antd";
import LocationPicker from "react-location-picker";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_PROJECT } from "../../contexts/apollo/mutations";

const { TextArea } = Input;

const defaultPosition = {
  lat: 27.9878,
  lng: 86.925
};

const RegistrationForm = ({ form }) => {
  const { getFieldDecorator } = form;
  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(
      (
        err,
        {
          location: {
            position: { lat, lng }
          },
          ...rest
        }
      ) => {
        console.log(rest, lng, lat);
        if (!err) {
          createProject({
            variables: {
              ...rest,
              lat: JSON.stringify(lat),
              lng: JSON.stringify(lng)
            }
          });
        }
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "60%" }}>
      <Form.Item label="Project Name">
        {getFieldDecorator("title", {
          rules: [
            {
              required: true,
              message: "Please input a project name!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Description&nbsp;
            <Tooltip title="A description for the project stating the result expected.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("description", {
          rules: [
            {
              required: true,
              message:
                "Please add a description so that people can know th project better",
              whitespace: true
            }
          ]
        })(<TextArea autoSize />)}
      </Form.Item>
      <Form.Item label="Photo">
        {getFieldDecorator("photo", {
          rules: [
            {
              required: true,
              message: "Please input a photo to describe the project!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Location">
        {getFieldDecorator("location", {
          rules: [
            {
              required: true,
              message: "Please input a photo to describe the project!"
            }
          ]
        })(
          <LocationPicker
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "400px" }} />}
            defaultPosition={defaultPosition}
          />
        )}
      </Form.Item>

      <Form.Item style={{ textAlign: "center", margin: "5%" }}>
        <Button type="primary" htmlType="submit" size="large" loading={loading}>
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
