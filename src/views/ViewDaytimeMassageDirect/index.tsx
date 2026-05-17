import React, { useCallback, useEffect, useState } from "react";
import { Alert, DatePicker, Form, FormInstance, message } from "antd";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  StyledButton,
  StyledForm,
  StyledH1,
  StyledInput,
  StyledRadioButton,
  StyledRadioGroup,
} from "@styles/styledComponents";
import FormItemSnsContact from "@components/FormItemSnsContact";
import FormItemMassageBooking from "@components/FormItemMassageBooking";
import FormItemMemoBooking from "@components/FormItemMemoBooking";
import TimePickerField from "@components/TimePickerField";
import ModalSpin from "@components/ModalSpin";
import massageDaytime from "@configs/massage-daytime";
import useMutation from "src/libs/useMutation";
import useBlockDates from "src/libs/useBlockDates";
import { EmailResponse } from "src/pages/api/CreateDaytimeMassage";

type PickKey = "mactan" | "cebu" | "noNeed";
type DropKey = "mactan" | "cebu" | "noNeed";

const PICK_DISABLED: Record<PickKey, { loc: boolean; time: boolean }> = {
  mactan: { loc: false, time: false },
  cebu: { loc: true, time: true },
  noNeed: { loc: true, time: true },
};

const DROP_DISABLED: Record<DropKey, { loc: boolean; time: boolean }> = {
  mactan: { loc: false, time: true },
  cebu: { loc: true, time: true },
  noNeed: { loc: true, time: true },
};

const PickupSection = ({ form }: { form: FormInstance }) => {
  const { t } = useTranslation("booking");
  const [selectKey, setSelectKey] = useState<PickKey>("mactan");
  const initKey = Form.useWatch("pickLocation_hidden", form);

  useEffect(() => {
    if (initKey) setSelectKey(initKey as PickKey);
  }, [initKey]);

  const onChangeRadio = (e: any) => {
    const key = e.target.value as PickKey;
    const fixedLoc =
      key === "cebu"
        ? t("drop.fixed.cebu.loc")
        : key === "noNeed"
        ? t("daytime.pick.fixed.noNeed.loc")
        : "";
    setSelectKey(key);
    form.setFieldValue("pickLocation_hidden", key);
    form.setFieldValue("pickLocation", fixedLoc);
    form.setFieldValue("pickTime", "");
  };

  const timePlaceholder =
    selectKey === "cebu"
      ? t("drop.fixed.cebu.loc")
      : selectKey === "noNeed"
      ? t("daytime.pick.placeholder.noNeed.time")
      : t("drop.placeholder.time");

  return (
    <>
      <StyledH1>{t("daytime.section.pickup")}</StyledH1>
      <Form.Item name="pickLocation_hidden" initialValue="mactan" hidden>
        <StyledInput />
      </Form.Item>
      <Form.Item style={{ width: "100%", marginBottom: 0 }}>
        <StyledRadioGroup size="large" onChange={onChangeRadio} value={selectKey}>
          {(["mactan", "cebu", "noNeed"] as PickKey[]).map((key) => (
            <StyledRadioButton key={key} value={key}>
              {t(`drop.tab.${key}`)}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>
      <Form.Item
        label={t("daytime.field.pickLocation")}
        name="pickLocation"
        rules={[{ required: !PICK_DISABLED[selectKey].loc, message: t("drop.error.location") }]}
        style={{ width: "100%" }}
      >
        <StyledInput
          size="large"
          placeholder={t("drop.placeholder.location")}
          disabled={PICK_DISABLED[selectKey].loc}
        />
      </Form.Item>
      <Form.Item
        label={t("daytime.field.pickTime")}
        name="pickTime"
        rules={[{ required: !PICK_DISABLED[selectKey].time, message: t("drop.error.time") }]}
        style={{ width: "100%" }}
      >
        {PICK_DISABLED[selectKey].time ? (
          <StyledInput size="large" placeholder={timePlaceholder} disabled />
        ) : (
          <TimePickerField placeholder={t("drop.placeholder.time")} />
        )}
      </Form.Item>
      <Alert
        message={t("daytime.alert.pickup.title")}
        description={t("daytime.alert.pickup.desc")}
        type="warning"
        showIcon
        style={{ width: "100%", margin: "20px 0" }}
      />
    </>
  );
};

const DropSection = ({ form }: { form: FormInstance }) => {
  const { t } = useTranslation("booking");
  const [selectKey, setSelectKey] = useState<DropKey>("mactan");
  const initKey = Form.useWatch("dropLocation_hidden", form);

  useEffect(() => {
    if (initKey) setSelectKey(initKey as DropKey);
  }, [initKey]);

  const onChangeRadio = (e: any) => {
    const key = e.target.value as DropKey;
    const fixedLoc =
      key === "cebu"
        ? t("drop.fixed.cebu.loc")
        : key === "noNeed"
        ? t("daytime.drop.fixed.noNeed.loc")
        : "";
    setSelectKey(key);
    form.setFieldValue("dropLocation_hidden", key);
    form.setFieldValue("dropLocation", fixedLoc);
    form.setFieldValue("dropTime", "");
  };

  const timePlaceholder =
    selectKey === "mactan"
      ? t("daytime.drop.placeholder.mactan.time")
      : selectKey === "cebu"
      ? t("drop.fixed.cebu.loc")
      : t("daytime.drop.placeholder.noNeed.time");

  return (
    <>
      <StyledH1>{t("daytime.section.drop")}</StyledH1>
      <Form.Item name="dropLocation_hidden" initialValue="mactan" hidden>
        <StyledInput />
      </Form.Item>
      <Form.Item style={{ width: "100%", marginBottom: 0 }}>
        <StyledRadioGroup size="large" onChange={onChangeRadio} value={selectKey}>
          {(["mactan", "cebu", "noNeed"] as DropKey[]).map((key) => (
            <StyledRadioButton key={key} value={key}>
              {t(`drop.tab.${key}`)}
            </StyledRadioButton>
          ))}
        </StyledRadioGroup>
      </Form.Item>
      <Form.Item
        label={t("drop.location.label")}
        name="dropLocation"
        rules={[{ required: !DROP_DISABLED[selectKey].loc, message: t("drop.error.location") }]}
        style={{ width: "100%" }}
      >
        <StyledInput
          size="large"
          placeholder={t("drop.placeholder.location")}
          disabled={DROP_DISABLED[selectKey].loc}
        />
      </Form.Item>
      <Form.Item
        label={t("drop.time.label")}
        name="dropTime"
        rules={[{ required: !DROP_DISABLED[selectKey].time, message: t("drop.error.time") }]}
        style={{ width: "100%" }}
      >
        <StyledInput size="large" placeholder={timePlaceholder} disabled />
      </Form.Item>
      <Alert
        message={t("daytime.alert.drop.title")}
        description={t("daytime.alert.drop.desc")}
        type="warning"
        showIcon
        style={{ width: "100%", margin: "20px 0" }}
      />
    </>
  );
};

const ViewDaytimeMassageDirect = () => {
  const router = useRouter();
  const { t } = useTranslation("booking");
  const [form] = Form.useForm();
  const { disabledDate } = useBlockDates("daytime");

  const [createDaytimeMassage, { loading, data, error }] =
    useMutation<EmailResponse>("/api/CreateDaytimeMassage");

  const onFinish = (values: any) => {
    const phone = `${values.snsType}: ${values.snsId}`;
    createDaytimeMassage({ ...values, phone });
  };

  const onFinishFailed = (errorInfo: any) => {
    const msg = errorInfo?.errorFields?.[0]?.errors?.[0] ?? t("error.retry");
    message.error(msg);
  };

  useEffect(() => {
    if (data?.ok) router.push("/cart/success");
  }, [data, router]);

  useEffect(() => {
    if (error) message.error(t("error.retry"));
  }, [error, t]);

  return (
    <>
      <ModalSpin loading={loading} title={t("loading.title")} description={t("loading.desc")} />
      <StyledForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        scrollToFirstError
      >
        <Form.Item name="package" hidden initialValue="[2] Daytime" />
        <Form.List name="couponList" initialValue={[]}>
          {() => null}
        </Form.List>

        <StyledH1>{t("title")}</StyledH1>
        <Form.Item
          label={t("field.name")}
          name="name"
          rules={[{ required: true, message: t("error.name") }]}
          style={{ width: "100%" }}
        >
          <StyledInput placeholder={t("placeholder.name")} size="large" />
        </Form.Item>
        <Form.Item
          label={t("field.email")}
          name="email"
          style={{ width: "100%" }}
          rules={[
            { type: "email", message: t("error.emailFormat") },
            { required: true, message: t("error.email") },
          ]}
        >
          <StyledInput placeholder={t("placeholder.email")} size="large" />
        </Form.Item>
        <FormItemSnsContact form={form} />

        <StyledH1>{t("daytime.section.date")}</StyledH1>
        <Form.Item
          label={t("field.date")}
          name="date"
          rules={[{ required: true, message: t("error.date") }]}
          style={{ width: "100%" }}
        >
          <DatePicker
            format="YYYY-MM-DD"
            placeholder={t("error.date")}
            className="ant-input"
            style={{ width: "100%", height: "60px", borderRadius: "10px" }}
            disabledDate={disabledDate}
          />
        </Form.Item>

        <FormItemMassageBooking form={form} selectOption={massageDaytime} />

        <StyledH1 style={{ textAlign: "center" }}>{t("daytime.section.massageTime")}</StyledH1>
        <Form.Item
          label={t("daytime.field.massageTime")}
          name="massageTime"
          rules={[{ required: true, message: t("daytime.error.massageTime") }]}
          style={{ width: "100%" }}
        >
          <TimePickerField placeholder={t("daytime.placeholder.massageTime")} />
        </Form.Item>

        <PickupSection form={form} />
        <DropSection form={form} />

        <FormItemMemoBooking />

        <StyledButton type="primary" htmlType="submit" disabled={loading}>
          {t("submit")}
        </StyledButton>
      </StyledForm>
    </>
  );
};

export default ViewDaytimeMassageDirect;
