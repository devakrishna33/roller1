import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { CREATE_PROJECT } from "../../contexts/apollo/mutations";
import { Layout, Typography, Input } from "antd";
import SideNav from "../SideNav";
import { ROUTES } from "../../constants";

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

  console.log(error);

  useEffect(() => {
    if (data?.createProject?.id) {
      push(ROUTES.PROJECT);
    }
  }, [data, loading]);

  return (
    <div>
      <Layout>
        <SideNav />
        <Layout style={{ margin: "auto", maxWidth: "50%" }}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0
            }}
          >
            <Title>New Project</Title>
            <Search
              placeholder="Project Title"
              enterButton="Create"
              loading={loading}
              size="large"
              onSearch={handleClick}
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
