import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "@rneui/base";
import { Calendar } from "react-native-calendars";
import type { DateData } from "react-native-calendars";
import { SpeedDial, Text } from "@rneui/themed";
import dayjs from "dayjs";
import ScheduleItem from "../../components/ScheduleItem";
import { ISchedule } from "../../types";
import HeaderBackButton from "../../components/HeaderBackButton";
import { useFetchSchedule } from "../../api/schedule";
import storage from "../../utils/storage";

const cclist: ISchedule[] = [
  {
    id: "sdf",
    title: "说法水电费水电费水电费水电费胜多负少的",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
  {
    id: "sdf1",
    title: "123",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
  {
    id: "sdf111",
    title: "123",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
  {
    id: "sd12f1",
    title: "123",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
  {
    id: "s3df1",
    title: "123",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
  {
    id: "sd4f2",
    title: "123",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
  {
    id: "sdf3",
    title: "123",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
  {
    id: "sdf4",
    title: "123",
    isFullDay: false,
    startTime: "2023-02-27 10:00",
    endTime: "2023-02-27 10:00",
    remind: "0",
    desc: "123123131231sdgsgsdfgdgsdgsd",
  },
];

export default function CalendarPage() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState<ISchedule[]>(cclist);
  const [nowDateString, setNowDateString] = React.useState<string>(""); // 现实中当前的时间
  const [curDateString, setCurDateString] = React.useState<string>(""); // 当前正在选中的日期

  const [uid, setUid] = React.useState<string>("");
  const [searchDateString, setSearchDateString] = React.useState<string>("");
  const { scheduleData, refetch, isLoading } = useFetchSchedule(
    uid,
    searchDateString
  );

  console.log("data", scheduleData);

  React.useEffect(() => {
    const nowDateStr = dayjs(Date.now()).format("YYYY-MM-DD");
    setCurDateString(nowDateStr);
    setNowDateString(nowDateStr);

    storage
      .load({
        key: "user",
      })
      .then((user) => {
        setUid(user.id);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePressDay = (val: DateData) => {
    setCurDateString(val.dateString);
  };

  // 处理回到 today
  const handleBack2Today = () => {
    setCurDateString(nowDateString);
  };

  const linkToCreate = () => {
    router.push(`/schedule/operate`);
  };

  return (
    <View style={styles.container}>
      <HeaderBackButton />
      <View style={styles.headerDivision} />
      <Calendar
        theme={{
          dayTextColor: "#101629",
        }}
        customHeader={(val: any) => (
          <View>
            <View style={styles.calendarHeader}>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text h4>{dayjs(curDateString).format("MMM DD")}</Text>
                <TouchableOpacity
                  style={{
                    paddingTop: 5,
                    paddingLeft: 10,
                    display: curDateString === nowDateString ? "none" : "flex",
                  }}
                  onPress={handleBack2Today}
                >
                  <Icon
                    name='settings-backup-restore'
                    style={{ fontSize: 12 }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{ marginRight: 5 }}
                  onPress={() => val.addMonth(-1)}
                >
                  <Icon name='chevron-left' style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => val.addMonth(1)}>
                  <Icon name='chevron-right' style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 10,
                paddingBottom: 5,
              }}
            >
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => (
                <Text
                  key={item}
                  style={{ flex: 1, textAlign: "center", color: "#3e434c" }}
                >
                  {item}
                </Text>
              ))}
            </View>
          </View>
        )}
        initialDate={curDateString}
        markedDates={{ [`${curDateString}`]: { selected: true } }}
        monthFormat={"MMM dd"}
        markingType={"dot"}
        enableSwipeMonths={true}
        hideExtraDays={true}
        onDayPress={handlePressDay}
      />

      <View style={{ backgroundColor: "white" }}>
        <Text
          h3
          h3Style={{
            padding: 20,
            fontWeight: "700",
            fontSize: 20,
            color: "#4b4e6d",
          }}
        >
          Schedule
        </Text>

        <SafeAreaView
          style={{
            ...styles.info,
            height: Dimensions.get("window").height - 400,
          }}
        >
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <ScheduleItem
                key={item.id}
                data={item}
                nowDateStr={nowDateString}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>

      <SpeedDial
        isOpen={open}
        icon={{ name: "menu", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color='#00adf5'
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title='Create'
          color='#00adf5'
          onPress={linkToCreate}
        />
        <SpeedDial.Action
          icon={{ name: "search", color: "#fff" }}
          title='Search'
          color='#00adf5'
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf1f3",
  },
  header: {
    padding: 10,
  },
  headerDivision: {
    backgroundColor: "white",
    height: 10,
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
  },
  info: {
    paddingLeft: 20,
  },
  icon: {
    padding: 5,
    fontSize: 20,
  },
});