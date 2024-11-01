import { Avatar, Flex, Group, ScrollArea, Text, rem } from "@mantine/core";
import {
  IconLogout,
  IconBuildingCommunity,
  IconHome,
  IconCertificate,
  IconSchool,
} from "@tabler/icons-react";
import { LinksGroup } from "./NavbarLinksGroup";
import logo from "../../../assets/logo-truong-dai-hoc-dai-nam.jpg";
import classes from "./style/NavbarNested.module.css";

const mockdata = [
  {
    label: "Trang chủ",
    icon: IconHome,
    initiallyOpened: true,
  },
  {
    label: "Khoa",
    icon: IconBuildingCommunity,
    initiallyOpened: true,
    links: [
      { label: "Danh sách khoa", link: "/faculty/faculty-management" },
      { label: "Danh sách chuyên ngành", link: "/faculty/major-management" },
    ],
  },
  {
    label: "Sinh viên",
    icon: IconSchool,
    initiallyOpened: true,
    links: [
      { label: "Sinh viên tốt nghiệp", link: "/student/student-graduated" },
    ],
  },
  {
    label: "Văn bằng",
    icon: IconCertificate,
    initiallyOpened: true,
    links: [{ label: "Loại văn bằng", link: "/degree/degree-type" }],
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="center">
          <img src={logo} style={{ width: rem(50) }} />
          <Text fw={"bold"} c={"#F27423"} size="18px">
            Quản lý văn bằng
          </Text>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <Avatar radius={"xl"} color="#F27423" />
        <Flex align={"center"} className={classes.logout} gap={"sm"} p={"sm"}>
          <Text fw={500} size="12px">
            Đăng xuất
          </Text>
          <IconLogout
            style={{
              width: rem(16),
              height: rem(16),
            }}
            stroke={1.5}
          />
        </Flex>
      </div>
    </nav>
  );
}
