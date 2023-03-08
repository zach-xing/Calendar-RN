import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon, Text } from "@rneui/base";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import ScheduleItem from "../components/ScheduleItem";

/** 展示样式块 */
const InfoBlock: React.FC<{
  goPath: string;
  title: string;
  color: string;
  icon: string;
}> = (props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(props.goPath)}
      style={{
        flex: 1,
        backgroundColor: `${props.color}22`,
        borderRadius: 10,
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Icon name={props.icon} size={30} color={props.color} />
      <Text style={{ textAlign: "center", marginTop: 10 }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 30, paddingRight: 30 }}>
        <View>
          <Text h3 h3Style={{ fontWeight: "500", fontFamily: "monospace" }}>
            Hello! Welcome
          </Text>
          <Text h3 h3Style={{ fontFamily: "monospace" }}>
            Zeekg
          </Text>
          <Text h4 h4Style={{ fontFamily: "monospace" }}>
            Have a nice day!
          </Text>
        </View>

        <View
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 30,
          }}
        >
          <InfoBlock
            title={"Schedule"}
            color={"#629e6c"}
            icon={"date-range"}
            goPath='/schedule'
          />
          <InfoBlock
            title={"Task"}
            color={"#7a7fe8"}
            icon={"assignment"}
            goPath='/schedule'
          />
        </View>
      </View>

      <View style={styles.todayBlock}>
        <Text h4 h4Style={{ margin: 10, marginLeft: 0 }}>
          Today
          <Text style={{ fontSize: 12, color: "grey" }}>
            {" "}
            {dayjs().format("YYYY MM-DD")}
          </Text>
        </Text>

        {/* TODO: 这里需要加 Schedule 和 task 的显示 */}
        <ScheduleItem
          data={{
            id: "sdf",
            title: "说法水电费水电费水电111",
            isFullDay: false,
            startTime: "2023-02-27 10:00",
            endTime: "2023-02-27 10:00",
            remind: "0",
            desc: "123123131231sdgsgsdfgdgsdgsd",
          }}
          nowDateStr={""}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    minHeight: "100%",
    paddingTop: 20,
  },
  todayBlock: {
    backgroundColor: "#e9ebf599",
    marginTop: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    minHeight: "100%",
    paddingLeft: 30,
    paddingRight: 30,
  },
});