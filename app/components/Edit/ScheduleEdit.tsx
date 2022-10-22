import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Card,
  Input,
  Select,
  SelectItem,
  Text,
  Toggle,
  Button,
} from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { remindArr } from "../../constant";
import DatePicker from "../DatePicker";
import storage from "../../utils/storage";

interface IProps {
  data: RNType.ScheduleType;
}

/**
 * 编辑 schedule event
 */
export default function ScheduleEdit(props: IProps) {
  const { data } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      remind: data.remind,
      desc: data.desc,
    },
  });
  const [isFullDay, setIsFullDay] = React.useState(false);
  const nowDateString = dayjs(new Date()).format("YYYY-MM-DD HH:mm");

  const onSubmit = async (newData) => {
    const list = await getStorageData();
    const idx = list.findIndex(
      (el) => el.id === data.id && el.dateString === data.dateString
    );
    console.log(idx);
    console.log(list[idx]);
    // console.log({
    //   // ...data,
    //   dateString: data.dateString, // 这里得变一下
    //   category: "schedule",
    //   id: data.id,
    //   ...newData,
    // });
  };

  // 从 storage 获取数据，返回值长度肯定大于等于 1
  const getStorageData = async () => {
    try {
      const list = await storage.load({
        key: "event",
        id: data.dateString.slice(0, 7),
      });
      return list;
    } catch (error) {
      return [];
    }
  };

  return (
    <Card style={{ width: 300 }}>
      <Controller
        name="title"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            label="标题"
            placeholder="please your title"
            onBlur={onBlur}
            onChangeText={onChange}
            status={errors.title ? "danger" : "basic"}
          />
        )}
      />

      {/* 选择日程的时间 */}
      <View style={styles.gap}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            ...styles.gap,
          }}
        >
          <Text>全天</Text>
          <Toggle
            checked={isFullDay}
            onChange={(res) => {
              setIsFullDay(res);
            }}
          />
        </View>

        {isFullDay ? (
          // 全天
          <Controller
            name="startTime"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <DatePicker label={"全天"} onChange={onChange} mode="date" />
            )}
          />
        ) : (
          // 不是 全天
          <>
            <Controller
              name="startTime"
              control={control}
              defaultValue={nowDateString}
              render={({ field: { onChange } }) => (
                <DatePicker
                  label={"开始时间"}
                  onChange={onChange}
                  mode="datetime"
                />
              )}
            />
            <Controller
              name="endTime"
              control={control}
              defaultValue={nowDateString}
              render={({ field: { onChange } }) => (
                <DatePicker
                  label={"结束时间"}
                  onChange={onChange}
                  mode="datetime"
                />
              )}
            />
          </>
        )}
      </View>

      <Controller
        name="remind"
        control={control}
        rules={{
          required: true,
        }}
        defaultValue={0}
        render={({ field: { onChange, value } }) => (
          <Select
            value={remindArr[value].value}
            style={styles.gap}
            label="提醒"
            onSelect={(index: any) => {
              onChange(index.row);
            }}
          >
            {remindArr.map((item) => (
              <SelectItem key={item.id} title={item.value} />
            ))}
          </Select>
        )}
      />

      <Controller
        name="desc"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="描述"
            value={value}
            multiline={true}
            textStyle={{ minHeight: 64 }}
            placeholder="please input desc"
            onBlur={onBlur}
            onChangeText={onChange}
          />
        )}
      />
      <Button style={styles.gap} onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gap: {
    marginVertical: 10,
  },
});
