import { Button, Flex, Input, Layout, Menu, Tooltip } from 'antd';
import { Outlet, useLocation } from 'umi';
import { useFlatInject } from '@/utils/hooks';
import { useEffect } from 'react';
import HeaderTab from './components/HeaderTab';
import { ArrowLeftOutlined, ArrowRightOutlined, InfoCircleOutlined, ReloadOutlined, StarOutlined } from '@ant-design/icons';


const { Header, Content, Sider } = Layout;
const LayoutFC = () => {

  const [store] = useFlatInject("global")
  const location = useLocation();
  useEffect(() => {
    store.buildConSideMenuList();
    store.selectSideMenu(location.pathname)
  }, [location]);

  const handleDragStart = (event: any) => {
    event.preventDefault(); // 阻止默认文本选择行为
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        data-tauri-drag-region
        onMouseDown={handleDragStart}
        style={{
          backgroundColor: "#bfbfbf",
          height: 45,
          userSelect: 'none'
        }}>
        <HeaderTab />
      </Header>
      <Layout>
        <Layout>
          <Flex
            align='center'
            style={{
              background: "#d9d9d9",
              height: '45px',
              // borderBottom: "1px solid #bfbfbf"
            }}
          >
            <Button
              size='small'
              style={{
                border: 'none',
                marginLeft: 10,
                backgroundColor: 'transparent',
              }}
            >
              <ArrowLeftOutlined />
            </Button>

            <Button
              size='small'
              style={{
                border: 'none',
                marginLeft: 5,
                backgroundColor: 'transparent',
              }}
            >
              <ArrowRightOutlined />
            </Button>
            <Button
              size='small'
              style={{
                border: 'none',
                marginLeft: 5,

                backgroundColor: 'transparent',
              }}
            >
              <ReloadOutlined />
            </Button>
            <Input
              placeholder="Input APISIX connection: http(s)://$apisix_host/$connection_name/$admin_key"
              style={{
                border: 'none',
                backgroundColor: "#f0f0f0",
                marginLeft: 10,
                marginRight: 15,
                height: 30,
                borderRadius: 10,
              }}
              suffix={
                <div>
                  <Button
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <StarOutlined />
                  </Button>
                </div>
              }
            />
          </Flex>
          <Content
            style={{
              background: "#f5f5f5",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout >
  );
};

export default LayoutFC;