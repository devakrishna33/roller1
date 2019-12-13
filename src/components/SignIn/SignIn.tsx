import React, { useEffect, FormEventHandler } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { FormComponentProps } from "antd/lib/form";
import { withAuthorization } from "../../contexts/session";
import { SIGN_IN } from "../../contexts/apollo/mutations";
import { ROUTES } from "../../constants";

const condition = (authUser: any) => !authUser;

export default withAuthorization(
  condition,
  ROUTES.HOME
)(
  Form.create()(({ form }: FormComponentProps) => {
    const { getFieldDecorator } = form;
    const { push } = useHistory();
    const [signIn, { data, loading, error }] = useMutation(SIGN_IN);

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          signIn({
            variables: {
              ...values
            }
          });
        }
      });
    };

    useEffect(() => {
      if (data?.signIn?.token) {
        localStorage.setItem("authToken", data.signIn.token);
        localStorage.setItem("authUser", JSON.stringify(data.signIn.user));
      }
    }, [data, loading, error]);

    return (
      <Form
        onSubmit={handleSubmit}
        className="login-form"
        style={{ maxWidth: "300px" }}
      >
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" style={{ float: "right" }} href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
            loading={loading}
          >
            Log in
          </Button>
          Or{" "}
          <a
            href=""
            onClick={() => {
              push(ROUTES.SIGN_UP);
            }}
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    );
  })
);
