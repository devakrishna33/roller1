import React, {
  useState,
  useEffect,
  FormEventHandler,
  FocusEventHandler
} from "react";
import { Form, Input, Tooltip, Icon, Button } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { FormComponentProps } from "antd/lib/form";
import { withAuthorization } from "../../contexts/session";
import { SIGN_UP } from "../../contexts/apollo/mutations";
import { ROUTES } from "../../constants";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

interface State {
  confirmDirty: boolean;
  autoCompleteResult: string[];
}

const condition = (authUser: any) => !authUser;

export default withAuthorization(
  condition,
  ROUTES.HOME
)(
  Form.create()(({ form }: FormComponentProps) => {
    const [{ confirmDirty }, setState] = useState<State>({
      confirmDirty: false,
      autoCompleteResult: []
    });
    const [signUp, { data, loading, error }] = useMutation(SIGN_UP, {
      errorPolicy: "all"
    });
    const { getFieldDecorator } = form;
    const { push } = useHistory();

    useEffect(() => {
      console.log(error);
      if (data?.signUp?.token) {
        localStorage.setItem("authToken", data.signUp.token);
        localStorage.setItem("authUser", JSON.stringify(data.signUp.user));
        push(ROUTES.HOME);
      }
    }, [loading, data, error]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
      e.preventDefault();
      form.validateFieldsAndScroll((err, { email, name, password }) => {
        if (!err) {
          signUp({
            variables: {
              email,
              password,
              name
            }
          });
        }
      });
    };

    const handleConfirmBlur: FocusEventHandler<HTMLInputElement> = e => {
      const { value } = e.target;
      setState((prevState: State) => ({
        ...prevState,
        confirmDirty: confirmDirty || !!value
      }));
    };

    const compareToFirstPassword = (_rule: any, value: any, callback: any) => {
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    };

    const validateToNextPassword = (_rule: any, value: any, callback: any) => {
      if (value && confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    };

    return (
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item
          label={
            <span>
              Name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input your name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  })
);
