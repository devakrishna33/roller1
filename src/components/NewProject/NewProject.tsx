import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { CREATE_PROJECT } from "../../contexts/apollo/mutations";
import { Layout, Typography, Input } from "antd";
import Navigation from "../Navigation";
import { ROUTES } from "../../constants";
import { NewProjectForm } from "./";

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

export default () => {
  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);

  const { push } = useHistory();
  const handleClick = (name: string) => {
    createProject({
      variables: {
        name
      }
    });
  };

  useEffect(() => {
    if (data?.createProject?.id) {
      push(ROUTES.PROJECT);
    }
  }, [data, loading]);

  return (
    <div>
      <Layout
        style={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Navigation />
        <Layout
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "100%"
          }}
        >
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <Title>New Project</Title>
            <NewProjectForm />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
