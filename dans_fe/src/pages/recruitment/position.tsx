import { Button, Card, Checkbox, Input, List, message, Skeleton } from "antd";
import { Building, Globe2 } from "lucide-react";
import Header from "../header";
import { useMutation } from "react-query";
import APIRequest from "../../api/request";
import { useEffect, useState } from "react";
import { useGlobalStore } from "../../store";
import moment from "moment";

export default function RecruitmentPositionPage() {
  const { data, params, setData, setParams } = useGlobalStore()
  const [update, setUpdate] = useState(true)
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: onFetchData, isLoading, isSuccess } = useMutation(async ({ more_data }: {
    more_data?: boolean
  }) => {
    const { data } = await APIRequest({
      method: 'GET',
      path: '/api/recruitment/positions',
      params: {
        ...params,
        description: params.description?.toLowerCase(),
        location: params.location?.toLowerCase(),
        page: more_data ? params.page : 1
      }
    })
    return data
  }, {
    onSuccess: (new_data, { more_data }) => {
      const cleaned_data = new_data
        .map((item: any) => ({ ...item, loading: true }))

      if (more_data) {
        setData([...data, ...cleaned_data])
      } else {
        setData(cleaned_data)
      }
    },
    onError: (e, { more_data }) => {
      if (more_data) {
        messageApi.error('No more jobs found')
      } else {
        messageApi.error('Error in system')
      }
    },
    onSettled: () => {
      setUpdate(false)
    }
  })

  useEffect(() => {
    if (update) {
      onFetchData({})
    }
    if (isSuccess) {
      setData(data.map((item: any) => ({ ...item, loading: false })))
    }
  }, [update, isSuccess]);

  return (
    <div className="bg-gray-100 w-screen h-screen">
      {contextHolder}
      <Header />
      <div className="p-6 space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setUpdate(true)
          }}
          className="flex items-end gap-4"
        >
          <div className="w-full">
            <label className="font-bold text-sm">Job Description</label>
            <Input
              placeholder="Filter by title, benefits, companies, expertise"
              prefix={<Building className="text-gray-300 h-4 w-4" />}
              value={params.description}
              onChange={e => setParams('description', e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-bold text-sm">Location</label>
            <Input
              placeholder="Filter by city, state, zip code or country"
              prefix={<Globe2 className="text-gray-300 h-4 w-4" />}
              value={params.location}
              onChange={e => setParams('location', e.target.value)}
            />
          </div>
          <Checkbox
            className="w-[20rem] h-8 items-center"
            checked={params.full_time}
            onChange={e => setParams('full_time', e.target.checked)}
          >
            Full Time Only
          </Checkbox>
          <Button type="primary" htmlType="submit">Search</Button>
        </form>
        <Card className="bg-white w-full">
          <p className="text-2xl font-bold mb-2">Job List</p>
          <hr />
          <List
            className=" h-[calc(100vh-18rem)] overflow-auto"
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={data}
            loadMore={<Button
              className="w-full"
              type="primary"
              loading={isLoading}
              onClick={() => {
                setParams('page', params.page + 1)
                onFetchData({ more_data: true })
              }}
            >
              More Jobs
            </Button>}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<a className="text-base font-semibold text-primary" href={"/app/" + item.id}>{item.title}</a>}
                    description={
                      <div className="flex gap-2">
                        <p className="text-gray-400">{item.company}</p>
                        -
                        <p className="text-green-600 font-bold">{item.type}</p>
                      </div>
                    }
                  />
                  <div>
                    <p className="font-medium">{item.location}</p>
                    <p className="text-gray-400">{moment(item.created_at).fromNow()}</p>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </div>

    </div >
  );
}
