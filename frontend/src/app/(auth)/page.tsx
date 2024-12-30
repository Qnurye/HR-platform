import {Button} from "@/components/ui/button";
import {AvatarUriFromName} from "@/lib/utils";
import {ArrowRight, Box, List, Quote, Tag} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const features = [
  {
    name: '审批',
    description: '请假？报销？请在本系统提交申请',
    icon: Box,
  },
  {
    name: '同事',
    description: '查看同事的信息，快速联系',
    icon: List,
  },
  {
    name: '部门',
    description: '获取本司所有部门的信息',
    icon: Tag,
  },
]

export default function Home() {
  return (
    <>
      <div className="relative bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">轻松地</span>{' '}
                  <span className="block text-primary xl:inline">走遍你的公司</span>
                </h1>
                <p
                  className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  HR-MS 让做大做强企业加速做大做强
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button
                      className="w-full flex items-center justify-center px-8 py-3"
                      asChild
                    >
                      <Link href="/departments">
                        公司架构
                        <ArrowRight className="ml-2 h-5 w-5"/>
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button variant="outline"
                            className="w-full" asChild>
                      <Link href="/employees">查找同事</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/placeholder.svg"
            width={800}
            height={600}
            alt=""
          />
        </div>
      </div>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">本平台能帮你做什么</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              一站式员工档案管理
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              通过 HR-MS，你可以快速查找同事，提交请假申请，查看部门信息等等
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <feature.icon className="h-6 w-6" aria-hidden="true"/>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>


      <section className="py-12 bg-indigo-700 overflow-hidden md:py-20 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Quote
            className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-indigo-400 opacity-50"/>
          <div className="relative">
            <blockquote className="mt-10">
              <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-white">
                <p>
                  此系统为本人数据库课程设计作品，用于员工档案信息管理，后端使用 Go，前端用 Next.js，数据库使用 PostgreSQL。
                </p>
              </div>
              <footer className="mt-8">
                <div className="md:flex md:items-center md:justify-center">
                  <div className="md:flex-shrink-0">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={AvatarUriFromName("Qnurye")} alt={"Qnurye"}/>
                      <AvatarFallback>QN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-base font-medium text-white"> 罗文杰</div>
                    <svg className="hidden md:block mx-1 h-5 w-5 text-indigo-400" fill="currentColor"
                         viewBox="0 0 20 20">
                      <path d="M11 0h3L9 20H6l5-20z"/>
                    </svg>
                    <div className="text-base font-medium text-indigo-200"> 本科生, 北京化工大学</div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
