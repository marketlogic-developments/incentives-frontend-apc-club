import React, { useEffect, useState } from "react";
import ContainerContent from "../components/containerContent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SelectInputValue from "../components/inputs/SelectInputValue";
import { ArrowDown } from "../components/icons";
import client from "../contentful";
import HtwImage from "../components/htw/htwImage";
import { Select } from "@mantine/core";
import HTW24 from "../public/assets/htw/htw-24";
import Table2Htw from "../components/htw/Table2Htw";
import { RootState } from "store/store";
import { CurrentUser } from "services/User/user.service";
import Image from "next/image";
import { OrganizationsFunction } from "functions/Organizations/Organizations";
import { setLoading } from "store/reducers/users.reducer";
import * as imgCC from "../public/assets/htw/img/cc.png"; 
import * as imgARC from "../public/assets/htw/img/arcoiris.png"; 
import * as imgAcct from "../public/assets/htw/img/acct.png"; 
import * as imgCCE from "../public/assets/htw/img/ccc.png";
import * as imgAprm from "../public/assets/htw/img/aprm.png";
import * as imgApro from "../public/assets/htw/img/apro.png";

const howtowin = ({ htws }: { htws: any }) => {
    const { user } = useSelector((state: RootState) => state.currentUser);
    const { organization } = useSelector((state: RootState) => state.organization);
    const [t, i18n] = useTranslation("global");
    const typeSegment = [
        t("htw.autoRenova"),
        t("htw.reactivation"),
        t("htw.nuevosn"),
    ];

    const optionsES = ["New Business", "Autorenewal"];
    const optionsPOR = ["New Business", "Autorenewal"];

    const initialValue =
    i18n.resolvedLanguage === "por"
        ? optionsPOR[0]
        : optionsES[0]

    const [dataHTW2, setDataHTW2] = useState<string>(initialValue);

    const { getOneOrganization } = OrganizationsFunction();

    useEffect(() => {
        if (user) {
            setLoading(true)
            getOneOrganization(user?.profile?.organizations[0].id as string).finally(() => setLoading(false));
        }

    }, [user]);

    const htwRes =
        dataHTW2 === "Q3-Q4"
            ? {
                AcrobatPro: ["15", "10", "5", "30", "20", "20"],
                AcrobatSign: ["15", "10", "5", "30", "20", "20"],
                ForTeam: ["20", "10", "8", "40", "20", "30"],
                SDL: ["15", "10", "8", "30", "20", "25"],
                SLP: ["15", "10", "8", "30", "20", "25"],
            }
            : {
                AcrobatPro: ["15", "10", "-", "30", "20", "20"],
                AcrobatSign: ["15", "10", "-", "30", "20", "20"],
                ForTeam: ["20", "10", "-", "40", "20", "30"],
                SDL: ["15", "10", "-", "30", "20", "25"],
                SLP: ["15", "10", "-", "30", "20", "25"],
            };

    const htwDist =
        dataHTW2 === "Q3-Q4"
            ? {
                AcrobatPro: ["10", "5", "3", "15", "10", "5"],
                AcrobatSign: ["10", "5", "3", "15", "10", "5"],
                ForTeam: ["10", "5", "3", "15", "10", "5"],
                SDL: ["10", "5", "3", "15", "10", "5"],
                SLP: ["10", "5", "3", "15", "10", "5"],
            }
            : {
                AcrobatPro: ["10", "5", "-", "15", "10", "5"],
                AcrobatSign: ["10", "5", "-", "15", "10", "5"],
                ForTeam: ["10", "5", "-", "15", "10", "5"],
                SDL: ["10", "5", "-", "15", "10", "5"],
                SLP: ["10", "5", "-", "15", "10", "5"],
            };

    const htwData = htwRes;


    const HtwTableNew2025 = () => {
        return (
            <>
                <div className="max-w-6xl mx-auto flex flex-row justify-end items-end w-full h-full">
                    <div className="w-1/12 mb-16">
                      <Image src={imgCC} alt="" />
                    </div>
                    <div className="w-11/12">
                    <div className="text-center p-4 text-blue-500">
                        <div className="text-lg font-medium">All Apps</div>
                        <div>
                        DigiPoints for the sale of each USD 1,000 FOB in sales in
                        participating products
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full border-collapse fixed-layout">
                        <colgroup>
                            <col style={{ width: "16.66%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                            <th className="p-4 text-center font-bold" rowSpan={2}>
                                
                                <Image src={imgAcct} alt="" />
                            </th>
                            <th colSpan={2}>
                                <div className="gradient-cct text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                                CCT
                                </div>
                            </th>
                            <th colSpan={2}>
                                <div className="gradient-cct-pro text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                                CCT PRO
                                </div>
                            </th>
                            <th colSpan={2}>
                                <div className="gradient-cce text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                                CCE Ed4
                                </div>
                            </th>
                            </tr>
                            <tr>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 10-14 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">10 - 14 seats</div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    40
                                </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    20
                                </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    50
                                </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    30
                                </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    70
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    40
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* 15-50 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">15 - 50 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    70
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    30
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    80
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    40
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    100
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    50
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* >51 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">&gt; 51 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    80
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    50
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    120
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    60
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    140
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    70
                                </p>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    {/* Adobe Creative Cloud Logo */}
                    </div>
                </div>
                <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
                    <div>
                    <img src="/public/assets/htw/img/arcoiris.png" alt="" />
                    </div>
                    <div className="bg-blacki text-white text-center mx-2 py-2 px-10 w-full rounded-md ">
                    Receive 10 DigiPoints for every <a href="https://www.adobe.com/express/" target="_new" title="Adobe Express"><u>Adobe Express</u></a> license you sell
                    </div>
                </div>
                <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
                    <div className="w-1/12 mb-16">
                      <Image src={imgApro} alt="" />
                    </div>
                    <div className="w-11/12">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full border-collapse fixed-layout">
                        <colgroup>
                            <col style={{ width: "16.66%" }} />
                            <col style={{ width: "25.002%" }} />
                            <col style={{ width: "16.668%" }} />
                            <col style={{ width: "25.002%" }} />
                            <col style={{ width: "16.668%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                            <th className="p-4 text-center font-bold" rowSpan={2}>
                                <Image src={imgCCE} alt="" />
                            </th>
                            <th colSpan={2}>
                                <div className="bg-rojo text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                                Acrobat Pro
                                </div>
                            </th>
                            <th colSpan={2}>
                                <div className="bg-rojo text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                                Acrobat Premium
                                </div>
                            </th>
                            </tr>
                            <tr>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 10-14 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">5 - 29 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    50
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    20
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    75
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    60
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* 15-50 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">30 - 100 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    80
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    30
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    120
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    85
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* >51 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md"> &gt;101 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    100
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    40
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    195
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    120
                                </p>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    {/* Adobe Creative Cloud Logo */}
                    </div>
                </div>
                <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
                    <div className="bg-gray-300 font-bold text-black text-center mx-2 py-2 px-10 w-full rounded-md ">
                    Receive 15 DigiPoints for every Acrobat AI Assistant license you sell
                    </div>
                </div>
                <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
                    <div className="w-1/12 mb-16">
                    <Image src={imgAprm} alt="" />
                    </div>
                    <div className="w-11/12">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full border-collapse fixed-layout">
                        <colgroup>
                            <col style={{ width: "16.66%" }} />
                            <col style={{ width: "41.67%" }} />
                            <col style={{ width: "41.67%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                            <th className="p-4 text-center font-bold" rowSpan={2}></th>
                            <th colSpan={2}>
                                <div className="bg-azul text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                                Acrobat Sign
                                </div>
                            </th>
                            </tr>
                            <tr>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            <th className="text-center text-sm font-medium">
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VIP</div>
                                <div className="text-xs">(EDU - GOV)</div>
                                </div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 10-14 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div
                                className="p-2 bg-gray-300 rounded-md"
                                
                                >
                                3,000 - 15,000 <br />
                                <span style={{ fontWeight: 300, fontSize: 12 }}>
                                    transactions
                                </span>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    40
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    20
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    75
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    60
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    70
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    40
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* 15-50 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div
                                className="p-2 bg-gray-300 rounded-md"
                                
                                >
                                15,001 - 30,000 <br />
                                <span style={{ fontWeight: 300, fontSize: 12 }}>
                                    transactions
                                </span>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    60
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    30
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    120
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    85
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    100
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    50
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* >51 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div
                                className="p-2 bg-gray-300 rounded-md"
                                
                                >
                                {" "}
                                &gt;30,001
                                <br />
                                <span style={{ fontWeight: 300, fontSize: 12 }}>
                                    transactions
                                </span>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    80
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    40
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    195
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    120
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    140
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold">
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    70
                                </p>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    {/* Adobe Creative Cloud Logo */}
                    </div>
                </div>
            </>

        )
    }

    const HtwTableAuto2025 = () => {
        return (
        <>
            <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
              <div className="w-1/12 mb-16">
                <Image src={imgCC} alt="" />
              </div>
              <div className="w-11/12">
                <div className="text-center p-4 text-blue-500">
                  <div className="text-lg font-medium">All Apps</div>
                  <div>
                    DigiPoints for the sale of each USD 1,000 FOB in sales in
                    participating products
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="w-full border-collapse fixed-layout">
                    <colgroup>
                      <col style={{ width: "16.66%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="p-4 text-center font-bold" rowSpan={2}>
                          <Image src={imgAcct} alt="" />
                        </th>
                        <th colSpan={2}>
                          <div className="gradient-cct text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                            CCT
                          </div>
                        </th>
                        <th colSpan={2}>
                          <div className="gradient-cct-pro text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                            CCT PRO
                          </div>
                        </th>
                        <th colSpan={2}>
                          <div className="gradient-cce text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                            CCE Ed4
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center text-sm font-medium" colSpan={6}>
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 10-14 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">10 - 14 seats</div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              20
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              30
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              40
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* 15-50 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">15 - 50 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              30
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              40
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              50
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* >51 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">&gt; 51 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              60
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              70
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={2}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              80
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Adobe Creative Cloud Logo */}
              </div>
            </div>
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
              
            </div>
            <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
              <div className="w-1/12 mb-16">
                <Image src={imgApro} alt="" />
              </div>
              <div className="w-11/12">
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="w-full border-collapse fixed-layout">
                    <colgroup>
                      <col style={{ width: "16.66%" }} />
                      <col style={{ width: "25.002%" }} />
                      <col style={{ width: "16.668%" }} />
                      <col style={{ width: "25.002%" }} />
                      <col style={{ width: "16.668%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="p-4 text-center font-bold" rowSpan={2}>
                          <Image src={imgCCE} alt="" />
                        </th>
                        <th colSpan={6}>
                          <div className="bg-rojo text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                            Acrobat Pro
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center text-sm font-medium" colSpan={6}>
                          <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 10-14 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">5 - 29 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={6}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              30
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* 15-50 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">30 - 100 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={6}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              40
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* >51 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md"> &gt;101 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={6}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              70
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Adobe Creative Cloud Logo */}
              </div>
            </div>
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
              
            </div>
            <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
              <div className="w-1/12 mb-16">               
                <Image src={imgAprm} alt="" />
              </div>
              <div className="w-11/12">
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="w-full border-collapse fixed-layout">
                    <colgroup>
                      <col style={{ width: "16.66%" }} />
                      <col style={{ width: "41.67%" }} />
                      <col style={{ width: "41.67%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="p-4 text-center font-bold" rowSpan={2}></th>
                        <th colSpan={2}>
                          <div className="bg-azul text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                            Acrobat Sign
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center text-sm font-medium" colSpan={6}>
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 10-14 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div
                            className="p-2 bg-gray-300 rounded-md"
                            
                          >
                            3,000 - 15,000 <br />
                            <span style={{ fontWeight: 300, fontSize: 12 }}>
                              transactions
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={6}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              20
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* 15-50 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div
                            className="p-2 bg-gray-300 rounded-md"
                            
                          >
                            15,001 - 30,000 <br />
                            <span style={{ fontWeight: 300, fontSize: 12 }}>
                              transactions
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={6}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              30
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* >51 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div
                            className="p-2 bg-gray-300 rounded-md"
                            
                          >
                            {" "}
                            &gt;30,001
                            <br />
                            <span style={{ fontWeight: 300, fontSize: 12 }}>
                              transactions
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold" colSpan={6}>
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              40
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Adobe Creative Cloud Logo */}
              </div>
            </div>
        </>
          
        )
    }

    const HtwTableNew2026 = () => {
        return (
        <>
            <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
              <div className="w-1/12 mb-16">
                <Image src={imgCC} alt="" />
              </div>
              <div className="w-11/12">
                <div className="text-center p-4 text-blue-500">
                  <div className="text-lg font-medium">All Apps</div>
                  <div>
                    DigiPoints for the sale of each USD 1,000 FOB in sales in
                    participating products
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="w-full border-collapse fixed-layout">
                    <colgroup>
                      <col style={{ width: "16.66%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                      <col style={{ width: "13.89%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="p-4 text-center font-bold" rowSpan={2}>
                          {/* <Image src={"/public/assets/htw/img/acct.png"} alt=""  layout="fill"/> */}
                          <Image src={imgAcct} alt="" />
                        </th>
                        <th colSpan={2}>
                          <div className="gradient-cct text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                            CCT
                          </div>
                        </th>
                        <th colSpan={2}>
                          <div className="gradient-cct-pro text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                            CCT PRO
                          </div>
                        </th>
                        <th colSpan={2}>
                          <div className="gradient-cce text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                            CCE Ed4
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 10-14 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">10 - 14 seats</div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* 15-50 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">15 - 50 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* >51 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">&gt; 51 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Adobe Creative Cloud Logo */}
              </div>
            </div>
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
              <div>
                <Image src={imgARC} alt="" />
              </div>
              <div className="bg-blacki text-white text-center mx-2 py-2 px-10 w-full rounded-md ">
                Receive 5 DigiPoints for every <a href="https://www.adobe.com/express/" target="_new" title="Adobe Express"><u>Adobe Express</u></a> license you sell
              </div>
            </div>
            <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
              <div className="w-1/12 mb-16">
                <Image src={imgApro} alt="" />
              </div>
              <div className="w-11/12">
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="w-full border-collapse fixed-layout">
                    <colgroup>
                      <col style={{ width: "16.66%" }} />
                      <col style={{ width: "25.002%" }} />
                      <col style={{ width: "16.668%" }} />
                      <col style={{ width: "25.002%" }} />
                      <col style={{ width: "16.668%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="p-4 text-center font-bold" rowSpan={2}>
                          <img src="img/ccc.png" alt="" srcSet="" />
                        </th>
                        <th colSpan={2}>
                          <div className="bg-rojo text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                            Acrobat Pro
                          </div>
                        </th>
                        <th colSpan={2}>
                          <div className="bg-rojo text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                            Acrobat Premium
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 10-14 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">5 - 29 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* 15-50 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md">30 - 100 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* >51 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div className="p-2 bg-gray-300 rounded-md"> &gt;101 seats</div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Adobe Creative Cloud Logo */}
              </div>
            </div>
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
              <div className="bg-gray-300 font-bold text-black text-center mx-2 py-2 px-10 w-full rounded-md ">
              Receive 5 DigiPoints for every Acrobat AI Assistant license you sell              </div>
            </div> 
            <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
              <div className="w-1/12 mb-16">
                <Image src={imgAprm} alt="" />
              </div>
              <div className="w-11/12">
                <div className="bg-white rounded-lg overflow-hidden">
                  <table className="w-full border-collapse fixed-layout">
                    <colgroup>
                      <col style={{ width: "16.66%" }} />
                      <col style={{ width: "41.67%" }} />
                      <col style={{ width: "41.67%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="p-4 text-center font-bold" rowSpan={2}></th>
                        <th colSpan={2}>
                          <div className="bg-azul text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                            Acrobat Sign
                          </div>
                        </th>
                      </tr>
                      <tr>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VMP</div>
                            <div className="text-xs">(COM - EDU - GOV)</div>
                          </div>
                        </th>
                        <th className="text-center text-sm font-medium">
                          <div className="bg-gray-200 rounded-md py-2 mx-2">
                            <div>VIP</div>
                            <div className="text-xs">(EDU - GOV)</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* 10-14 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div
                            className="p-2 bg-gray-300 rounded-md"
                            
                          >
                            3,000 - 15,000 <br />
                            <span style={{ fontWeight: 300, fontSize: 12 }}>
                              transactions
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              70
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              40
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* 15-50 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div
                            className="p-2 bg-gray-300 rounded-md"
                            
                          >
                            15,001 - 30,000 <br />
                            <span style={{ fontWeight: 300, fontSize: 12 }}>
                              transactions
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              100
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              50
                            </p>
                          </div>
                        </td>
                      </tr>
                      {/* >51 seats row */}
                      <tr>
                        <td className="text-center font-semibold">
                          <div
                            className="p-2 bg-gray-300 rounded-md"
                            
                          >
                            {" "}
                            &gt;30,001
                            <br />
                            <span style={{ fontWeight: 300, fontSize: 12 }}>
                              transactions
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              7
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              5
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cce"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              140
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div className="relative flex flex-row w-full items-center justify-center">
                            <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                            <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                              70
                            </p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Adobe Creative Cloud Logo */}
              </div>
            </div>
        </>
          
        )
    }

    const HtwTableAuto2026 = () => {
        return (
            <>
                <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
                    <div className="w-1/12 mb-16">
                    <Image src={imgCC} alt="" />
                    </div>
                    <div className="w-11/12">
                    <div className="text-center p-4 text-blue-500">
                        <div className="text-lg font-medium">All Apps</div>
                        <div>
                        DigiPoints for the sale of each USD 1,000 FOB in sales in
                        participating products
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full border-collapse fixed-layout">
                        <colgroup>
                            <col style={{ width: "16.66%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                            <col style={{ width: "13.89%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                            <th className="p-4 text-center font-bold" rowSpan={2}>
                                <Image src={imgAcct} alt="" />
                            </th>
                            <th colSpan={2}>
                                <div className="gradient-cct text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                                CCT
                                </div>
                            </th>
                            <th colSpan={2}>
                                <div className="gradient-cct-pro text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                                CCT PRO
                                </div>
                            </th>
                            <th colSpan={2}>
                                <div className="gradient-cce text-white py-2 mx-2 my-2 rounded-md text-center font-bold text-xl">
                                CCE Ed4
                                </div>
                            </th>
                            </tr>
                            <tr>
                            <th className="text-center text-sm font-medium" colSpan={6}>
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 10-14 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">10 - 14 seats</div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            <td className="py-2 px-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* 15-50 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">15 - 50 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* >51 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">&gt; 51 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={2}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-cct-pro"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    {/* Adobe Creative Cloud Logo */}
                    </div>
                </div>
                <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
                    
                </div>
                <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
                    <div className="w-1/12 mb-16">
                    <Image src={imgApro} alt="" />
                    </div>
                    <div className="w-11/12">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full border-collapse fixed-layout">
                        <colgroup>
                            <col style={{ width: "16.66%" }} />
                            <col style={{ width: "25.002%" }} />
                            <col style={{ width: "16.668%" }} />
                            <col style={{ width: "25.002%" }} />
                            <col style={{ width: "16.668%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                            <th className="p-4 text-center font-bold" rowSpan={2}>
                                <Image src={imgCCE} alt="" />
                            </th>
                            <th colSpan={6}>
                                <div className="bg-rojo text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                                Acrobat Pro
                                </div>
                            </th>
                            </tr>
                            <tr>
                            <th className="text-center text-sm font-medium" colSpan={6}>
                                <div className="bg-gray-200 rounded-md py-2 mx-2 my-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 10-14 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">5 - 29 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={6}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* 15-50 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md">30 - 100 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={6}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* >51 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div className="p-2 bg-gray-300 rounded-md"> &gt;101 seats</div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={6}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-rojo "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    {/* Adobe Creative Cloud Logo */}
                    </div>
                </div>
                <div className="mx-auto flex max-w-6xl flex-row items-center justify-center py-2 w-full mb-24">
                    
                </div>
                <div className="max-w-6xl mx-auto flex flex-row justify-end items-end">
                    <div className="w-1/12 mb-16">
                    <Image src={imgAprm} alt="" />
                    </div>
                    <div className="w-11/12">
                    <div className="bg-white rounded-lg overflow-hidden">
                        <table className="w-full border-collapse fixed-layout">
                        <colgroup>
                            <col style={{ width: "16.66%" }} />
                            <col style={{ width: "41.67%" }} />
                            <col style={{ width: "41.67%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                            <th className="p-4 text-center font-bold" rowSpan={2}></th>
                            <th colSpan={2}>
                                <div className="bg-azul text-white py-2 mx-2 rounded-md text-center font-bold text-xl">
                                Acrobat Sign
                                </div>
                            </th>
                            </tr>
                            <tr>
                            <th className="text-center text-sm font-medium" colSpan={6}>
                                <div className="bg-gray-200 rounded-md py-2 mx-2">
                                <div>VMP</div>
                                <div className="text-xs">(COM - EDU - GOV)</div>
                                </div>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 10-14 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div
                                className="p-2 bg-gray-300 rounded-md"
                                
                                >
                                3,000 - 15,000 <br />
                                <span style={{ fontWeight: 300, fontSize: 12 }}>
                                    transactions
                                </span>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={6}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul "></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* 15-50 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div
                                className="p-2 bg-gray-300 rounded-md"
                                
                                >
                                15,001 - 30,000 <br />
                                <span style={{ fontWeight: 300, fontSize: 12 }}>
                                    transactions
                                </span>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={6}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                            {/* >51 seats row */}
                            <tr>
                            <td className="text-center font-semibold">
                                <div
                                className="p-2 bg-gray-300 rounded-md"
                                
                                >
                                {" "}
                                &gt;30,001
                                <br />
                                <span style={{ fontWeight: 300, fontSize: 12 }}>
                                    transactions
                                </span>
                                </div>
                            </td>
                            <td className="p-4 text-center font-semibold" colSpan={6}>
                                <div className="relative flex flex-row w-full items-center justify-center">
                                <div className="absolute left-0 top-1/2 h-10 w-2 rounded-full -translate-y-1/2 bg-azul"></div>
                                <p className="bg-gray-100 px-2 py-1 text-center rounded-md w-full">
                                    5
                                </p>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    {/* Adobe Creative Cloud Logo */}
                    </div>
                </div>
            </>
        )
    }

    // return (
    //   <ContainerContent pageTitle={t("dashboard.htw")}>
    //     <div className="flex flex-col gap-10 mb-12 m-6">
    //       <div className="bg-[#01505b] w-full h-[35vh] relative overflow-hidden flex">
    //         <div className="bgCointainerHTW"></div>
    //         <div className="w-full h-full flex justify-center items-center">
    //           <h2
    //             className="2xl:!text-4xl font-bold text-white text-center"
    //             dangerouslySetInnerHTML={{ __html: String(t("htw.title")) }}
    //           ></h2>
    //         </div>
    //       </div>
    //       <div className="flex flex-col w-full justify-center items-center gap-10">
    //         <h3
    //           className="2xl:!text-3xl font-bold xl:!text-2xl lg:!text-xl text-center"
    //           dangerouslySetInnerHTML={{ __html: String(t("htw.secondTitle")) }}
    //         ></h3>
    //         {/* <p
    //           className="!text-xs text-center"
    //           dangerouslySetInnerHTML={{ __html: t("htw.phraseSecondTitle") }}
    //         ></p> */}
    //       </div>
    //       <div className="flex flex-col gap-6 shadow-xl rounded-lg lg:p-6 p-3">
    //         <Select
    //           value={dataHTW2}
    //           data={["Q1-Q2", "Q3-Q4"].map((data) => {
    //             return {
    //               value: data,
    //               label: data,
    //             };
    //           })}
    //           onChange={(data) => setDataHTW2(String(data))}
    //           name={"dateHTW"}
    //           classNames={{
    //             input:
    //               "rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white",
    //           }}
    //         />
    //         <div className="w-full grid grid-cols-4 lg:gap-0 gap-6">
    //           <div className="flex col-span-3 lg:col-span-2 lg:gap-2 xl:gap-6">
    //             <div className="lg:px-2 xl:px-6">
    //               <HTW24 />
    //             </div>
    //             <div className="flex flex-col justify-end gap-3 px-3">
    //               <p className="lg:!text-xl text-primary font-bold">
    //                 {t("htw.tabletitle1")}
    //               </p>
    //               <hr />
    //               <p className="lg:!text-[10px] xl:!text-sm text-[#1473E6] font-semibold">
    //                 {t("htw.tabledescription1")}
    //               </p>
    //               <p className="lg:!text-[10px] xl:!text-sm font-semibold">
    //                 {t("htw.business1")}
    //               </p>
    //             </div>
    //           </div>
    //           <div className="col-span-3 lg:col-span-2 grid grid-cols-3 lg:gap-x-6 gap-x-4 gap-y-2 place-items-center">
    //             {typeSegment.map((text, idx) => (
    //               <div
    //                 className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
    //                   (idx + 1) % 2 === 0
    //                     ? "border-info"
    //                     : (idx + 1) % 3 === 0
    //                     ? "border-[#2C2C2C]"
    //                     : "border-primary"
    //                 }`}
    //               >
    //                 <p className="!text-xs lg:!text-sm font-bold text-center py-3">
    //                   {text}
    //                 </p>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //         <div className="w-full lg:grid flex flex-col-reverse grid-cols-4">
    //           <div className="flex flex-col lg:flex-row w-full col-span-1 justify-center">
    //             <div className="w-full flex lg:flex-col flex-row gap-6 justify-center">
    //               <div className="flex items-center">
    //                 <div className="flex flex-col items-center gap-3 w-1/2 lg:w-1/3 lg:h-1/2 justify-center">
    //                   <figure className="w-[40px]">
    //                     <img src="/assets/dashboard/DC.webp"></img>
    //                   </figure>
    //                   <p className="font-bold xl:!text-base lg:!text-xs text-center">
    //                     Document <br /> Cloud
    //                   </p>
    //                 </div>
    //                 <div className="lg:w-2/3 flex flex-col gap-3">
    //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#D5D5D5]">
    //                     Acrobat Pro
    //                   </p>
    //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
    //                     Acrobat Sign
    //                   </p>
    //                 </div>
    //               </div>
    //               <div className="flex items-center">
    //                 <div className="flex flex-col items-center gap-3 w-1/2 lg:w-1/3 lg:h-1/2 justify-center">
    //                   <figure className="w-[40px]">
    //                     <img src="/assets/dashboard/cc.webp"></img>
    //                   </figure>
    //                   <p className="font-bold xl:!text-base lg:!text-xs text-center">
    //                     Creative <br /> Cloud
    //                   </p>
    //                 </div>
    //                 <div className="lg:w-2/3 flex flex-col gap-3">
    //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#D5D5D5]">
    //                     For Teams
    //                   </p>
    //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
    //                     SDL/Named
    //                   </p>
    //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
    //                     SLP
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="col-span-3 flex flex-col gap-6 ">
    //             <div className="flex flex-col gap-2">
    //               <div className="col-span-full grid grid-cols-6">
    //                 <div className="col-span-2 flex flex-col justify-center gap-3">
    //                   <p className="text-center">1 - 4 {t("htw.licences")}</p>
    //                   <p className="text-center">+ 5 {t("htw.licences")}</p>
    //                 </div>
    //                 <div className="col-span-4 grid grid-cols-3 gap-2">
    //                   {htwData.AcrobatPro.map((text, idx) => (
    //                     <div
    //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
    //                         idx % 3 === 0
    //                           ? "border-primary"
    //                           : idx % 3 === 1
    //                           ? "border-info"
    //                           : "border-[#2C2C2C]"
    //                       }`}
    //                     >
    //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
    //                         {text}
    //                       </p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //               <hr />
    //               <div className="col-span-full grid grid-cols-6">
    //                 <div className="col-span-2 flex flex-col justify-center gap-3">
    //                   <p className="text-center">
    //                     1 - 2999 {t("htw.transactions")}
    //                   </p>
    //                   <p className="text-center">
    //                     + 3000 {t("htw.transactions")}
    //                   </p>
    //                 </div>
    //                 <div className="col-span-4 grid grid-cols-3 gap-2">
    //                   {htwData.AcrobatPro.map((text, idx) => (
    //                     <div
    //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
    //                         idx % 3 === 0
    //                           ? "border-primary"
    //                           : idx % 3 === 1
    //                           ? "border-info"
    //                           : "border-[#2C2C2C]"
    //                       }`}
    //                     >
    //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
    //                         {text}
    //                       </p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="flex flex-col gap-2">
    //               <div className="col-span-full grid grid-cols-6">
    //                 <div className="col-span-2 flex flex-col justify-center gap-3">
    //                   <p className="text-center">1 - 9 {t("htw.licences")}</p>
    //                   <p className="text-center">+ 10 {t("htw.licences")}</p>
    //                 </div>
    //                 <div className="col-span-4 grid grid-cols-3 gap-2">
    //                   {htwData.ForTeam.map((text, idx) => (
    //                     <div
    //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
    //                         idx % 3 === 0
    //                           ? "border-primary"
    //                           : idx % 3 === 1
    //                           ? "border-info"
    //                           : "border-[#2C2C2C]"
    //                       }`}
    //                     >
    //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
    //                         {text}
    //                       </p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //               <hr />
    //               <div className="col-span-full grid grid-cols-6">
    //                 <div className="col-span-2 flex flex-col justify-center gap-3">
    //                   <p className="text-center">1 - 49 {t("htw.licences")}</p>
    //                   <p className="text-center">+ 50 {t("htw.licences")}</p>
    //                 </div>
    //                 <div className="col-span-4 grid grid-cols-3 gap-2">
    //                   {htwData.SLP.map((text, idx) => (
    //                     <div
    //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
    //                         idx % 3 === 0
    //                           ? "border-primary"
    //                           : idx % 3 === 1
    //                           ? "border-info"
    //                           : "border-[#2C2C2C]"
    //                       }`}
    //                     >
    //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
    //                         {text}
    //                       </p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //               <hr />
    //               <div className="col-span-full grid grid-cols-6">
    //                 <div className="col-span-2 flex flex-col justify-center gap-3">
    //                   <p className="text-center">1 - 24 {t("htw.licences")}</p>
    //                   <p className="text-center">+ 25 {t("htw.licences")}</p>
    //                 </div>
    //                 <div className="col-span-4 grid grid-cols-3 gap-2">
    //                   {htwData.SLP.map((text, idx) => (
    //                     <div
    //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
    //                         idx % 3 === 0
    //                           ? "border-primary"
    //                           : idx % 3 === 1
    //                           ? "border-info"
    //                           : "border-[#2C2C2C]"
    //                       }`}
    //                     >
    //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
    //                         {text}
    //                       </p>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="w-full flex justify-center my-6">
    //           <div className="w-[80%]">
    //             <p className="text-sm">
    //               <strong className="text-primary">
    //                 {t("htw.autorenovaInput")}
    //               </strong>{" "}
    //               {t("htw.autorenovaDes")}
    //             </p>
    //             <p className="text-sm">
    //               <strong className="text-primary">
    //                 {t("htw.reactivationInput")}
    //               </strong>{" "}
    //               {t("htw.reactivationDes")}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <Table2Htw user={user as CurrentUser} dataHTW={dataHTW2} />
    //     </div>
    //   </ContainerContent>
    // );

    return (
        <ContainerContent pageTitle={t("dashboard.htw")}>
            <div className="flex flex-col gap-10 mb-12 m-6">
                <div className="bg-[#01505b] w-full h-[35vh] relative overflow-hidden flex">
                    <div className="bgCointainerHTW"></div>
                    <div className="w-full h-full flex justify-center items-center">
                        <h2
                            className="2xl:!text-4xl font-bold text-white text-center"
                            dangerouslySetInnerHTML={{ __html: String(t("htw.title")) }}
                        ></h2>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center items-center gap-10">
                    <h3
                        className="2xl:!text-3xl font-bold xl:!text-2xl lg:!text-xl text-center"
                        dangerouslySetInnerHTML={{ __html: String(t("htw.secondTitle")) }}
                    ></h3>
                    {/* <p
            className="!text-xs text-center"
            dangerouslySetInnerHTML={{ __html: t("htw.phraseSecondTitle") }}
          ></p> */}
                </div>
                <div className="flex flex-col gap-6 shadow-xl rounded-lg lg:p-6 p-3">
                    <p className="text-sm text-left text-blue-400">
                        {t("htw.labelSelect")}
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-1">
                            {i18n.resolvedLanguage === "por" ?
                                <Select
                                    value={dataHTW2}
                                    data={optionsPOR.map((data) => ({
                                        value: data,
                                        label: data,
                                    }))}
                                    onChange={(data) => setDataHTW2(String(data))}
                                    name={"dateHTW"}
                                    classNames={{
                                        input:
                                            "rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white",
                                    }}
                                />
                                :
                                <Select
                                    value={dataHTW2}
                                    data={optionsES.map((data) => ({
                                        value: data,
                                        label: data,
                                    }))}
                                    onChange={(data) => setDataHTW2(String(data))}
                                    name={"dateHTW"}
                                    classNames={{
                                        input:
                                            "rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white",
                                    }}
                                />
                            }
                        </div>
                    </div>

                    {(() => {
                        const distributionChannelName = organization?.distribution_channel?.name;

                        if (distributionChannelName === "DISTRIBUTOR") { 
                            return (
                                <div className="w-full"> {
                                  dataHTW2 === "Autorenewal"
                                      ? <HtwTableAuto2026 />
                                      : <HtwTableNew2026 />
                                }
                                </div>
                            );

                        } else {
                            return (
                              <div className="w-full"> {
                                dataHTW2 === "Autorenewal"
                                    ? <HtwTableAuto2025 />
                                    : <HtwTableNew2025 />
                              }
                              </div>
                            )
                        }

                        return null;
                    })()}
                </div>
            </div>
        </ContainerContent>
    );
};

export async function getServerSideProps() {
    const entries = await client.getEntries({
        content_type: "sectionHtw",
    });

    return {
        props: {
            htws: entries.items.map(({ fields }) => fields),
        },
    };
}

export default howtowin;
