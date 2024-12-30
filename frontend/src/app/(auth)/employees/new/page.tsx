"use client";

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {cn, isAdmin} from "@/lib/utils";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {
  EducationLevel,
  EducationLevelMap,
  Ethnicity,
  EthnicityMap,
  Gender,
  GenderMap,
  PlaceOfOrigin,
  PlaceOfOriginMap,
  PoliticalStatus,
  PoliticalStatusMap,
  Position,
  PositionMap,
  Title,
  TitleMap,
  UserStatus
} from "@/service/schema/user";
import {createUser} from "@/service/user";
import {toast} from "sonner";
import {Checkbox} from "@/components/ui/checkbox";
import {getAllDepartments} from "@/service/department";
import {Department} from "@/service/schema/department";
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {CalendarIcon} from "lucide-react"
import {format} from "date-fns"

export default function NewEmployeePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    isAdmin().then(isAdmin => {
      if (!isAdmin) {
        router.push('/employees');
      }
    });
  }, [router]);

  useEffect(() => {
    getAllDepartments().then(setDepartments).catch(console.error);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    gender: Gender.Male,
    ethnicity: Ethnicity.Han,
    birthday: undefined as Date | undefined,
    political_status: PoliticalStatus.Other,
    education_level: EducationLevel.Bachelor,
    marital_status: false,
    place_of_origin: PlaceOfOrigin.Beijing,
    id_number: '',
    phone_number: '',
    archive_location: '',
    residence_location: '',
    work_id_number: '',
    hire_date: undefined as Date | undefined,
    position: Position.Staff,
    title: Title.Engineer,
    status: UserStatus.Active,
    department_id: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUser({
        ...formData,
        username: formData.name,
        birthday: formData.birthday!,
        hire_date: formData.hire_date!,
      });
      router.push('/employees');
    } catch (error) {
      toast.error('创建员工失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>新建员工</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">个人信息</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">性别</Label>
                    <Select
                      value={formData.gender.toString()}
                      onValueChange={(value) => setFormData({...formData, gender: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue/>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(Gender).map(([, value]) => (
                          typeof value === 'number' &&
                          <SelectItem key={value} value={value.toString()}>
                            {GenderMap[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ethnicity">民族</Label>
                    <Select
                      value={formData.ethnicity.toString()}
                      onValueChange={(value) => setFormData({...formData, ethnicity: parseInt(value)})}
                    >
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        {Object.entries(Ethnicity).map(([, value]) => (
                          typeof value === 'number' &&
                          <SelectItem key={value} value={value.toString()}>
                            {EthnicityMap[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthday">生日</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.birthday && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4"/>
                          {formData.birthday ? format(formData.birthday, "yyyy-MM-dd") : <span>选择日期</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.birthday}
                          onSelect={(date) => setFormData({...formData, birthday: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education_level">学历</Label>
                    <Select
                      value={formData.education_level.toString()}
                      onValueChange={(value) => setFormData({...formData, education_level: parseInt(value)})}
                    >
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        {Object.entries(EducationLevel).map(([, value]) => (
                          typeof value === 'number' &&
                          <SelectItem key={value} value={value.toString()}>
                            {EducationLevelMap[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marital_status"
                      checked={formData.marital_status}
                      onCheckedChange={(checked) =>
                        setFormData({...formData, marital_status: checked as boolean})}
                    />
                    <Label htmlFor="marital_status">已婚</Label>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-lg font-semibold">联系方式</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">电话号码</Label>
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id_number">身份证号</Label>
                    <Input
                      id="id_number"
                      value={formData.id_number}
                      onChange={(e) => setFormData({...formData, id_number: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="place_of_origin">籍贯</Label>
                    <Select
                      value={formData.place_of_origin.toString()}
                      onValueChange={(value) => setFormData({...formData, place_of_origin: parseInt(value)})}
                    >
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        {Object.entries(PlaceOfOrigin).map(([, value]) => (
                          typeof value === 'number' &&
                          <SelectItem key={value} value={value.toString()}>
                            {PlaceOfOriginMap[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="residence_location">户口所在地</Label>
                    <Input
                      id="residence_location"
                      value={formData.residence_location}
                      onChange={(e) => setFormData({...formData, residence_location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="archive_location">档案存放地</Label>
                    <Input
                      id="archive_location"
                      value={formData.archive_location}
                      onChange={(e) => setFormData({...formData, archive_location: e.target.value})}
                    />
                  </div>
                </div>
              </section>

              {/* Work Information Section */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">工作信息</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="work_id_number">工号</Label>
                    <Input
                      id="work_id_number"
                      value={formData.work_id_number}
                      onChange={(e) => setFormData({...formData, work_id_number: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hire_date">入职日期</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.hire_date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4"/>
                          {formData.hire_date ? format(formData.hire_date, "yyyy-MM-dd") : <span>选择日期</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.hire_date}
                          onSelect={(date) => setFormData({...formData, hire_date: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">职位</Label>
                    <Select
                      value={formData.position.toString()}
                      onValueChange={(value) => setFormData({...formData, position: parseInt(value)})}
                    >
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        {Object.entries(Position).map(([, value]) => (
                          typeof value === 'number' &&
                          <SelectItem key={value} value={value.toString()}>
                            {PositionMap[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">职务</Label>
                    <Select
                      value={formData.title.toString()}
                      onValueChange={(value) => setFormData({...formData, title: parseInt(value)})}
                    >
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        {Object.entries(Title).map(([, value]) => (
                          typeof value === 'number' &&
                          <SelectItem key={value} value={value.toString()}>
                            {TitleMap[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">部门</Label>
                    <Select
                      value={formData.department_id.toString()}
                      onValueChange={(value) => setFormData({...formData, department_id: parseInt(value)})}
                    >
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id.toString()}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>

              {/* Political Status Section */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">政治面貌</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="political_status">政治面貌</Label>
                    <Select
                      value={formData.political_status.toString()}
                      onValueChange={(value) => setFormData({...formData, political_status: parseInt(value)})}
                    >
                      <SelectTrigger><SelectValue/></SelectTrigger>
                      <SelectContent>
                        {Object.entries(PoliticalStatus).map(([, value]) => (
                          typeof value === 'number' &&
                          <SelectItem key={value} value={value.toString()}>
                            {PoliticalStatusMap[value]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                取消
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? '保存中...' : '保存'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
