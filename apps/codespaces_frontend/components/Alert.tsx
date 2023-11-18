"use Client"
import { Alert } from "flowbite-react";
import { Dropdown } from "flowbite-react";

export default function MyPage() {
  return <>
  <Alert color="info">dis is wrong vijeo</Alert>
  <Dropdown label="Dropdown button">
  <Dropdown.Item>
    Dashboard
  </Dropdown.Item>
  <Dropdown.Item>
    Settings
  </Dropdown.Item>
  <Dropdown.Item>
    Earnings
  </Dropdown.Item>
  <Dropdown.Item>
    Sign out
  </Dropdown.Item>
</Dropdown>
  </> ;
}