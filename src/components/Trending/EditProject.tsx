import React, { Dispatch, SetStateAction, FormEventHandler } from "react";
import { Modal, Form, Input, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useMutation } from "@apollo/react-hooks";
import { EDIT_PROJECT } from "../../contexts/apollo/mutations";
import { ALL_PROJECTS } from "../../contexts/apollo/queries";
import { Project } from "../../interfaces";
import TextArea from "antd/lib/input/TextArea";

interface Props extends Project {
  open: boolean;
  handleClose: Dispatch<SetStateAction<string>>;
}

interface EditProps extends FormComponentProps, Project {}

const EditForm = Form.create<EditProps>()(
  ({ form, title, photo, description, id }: EditProps) => {
    const { getFieldDecorator } = form;
    const [editProject, { loading, error }] = useMutation(EDIT_PROJECT, {
      refetchQueries: [
        {
          query: ALL_PROJECTS
        }
      ]
    });

    if (error) {
      console.log(error);
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
      e.preventDefault();

      form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          editProject({
            variables: {
              ...values,
              id
            }
          });
        }
      });
    };

    return (
      <Form
        onSubmit={handleSubmit}
        className="login-form"
        style={{ maxWidth: "300px", margin: "auto" }}
      >
        <Form.Item>
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "Please input a title!" }],
            initialValue: title
          })(<Input placeholder="Title" size="large" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("description", {
            initialValue: description
          })(<TextArea autoSize placeholder="Description" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("photo", {
            initialValue: photo
          })(<Input size="large" placeholder="Photo " />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={loading}
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
);

export default ({ open, handleClose, ...props }: Props) => {
  return (
    <Modal
      title="Edit Project"
      centered
      visible={open}
      onOk={() => handleClose("")}
      onCancel={() => handleClose("")}
    >
      <EditForm {...props} />
    </Modal>
  );
};
