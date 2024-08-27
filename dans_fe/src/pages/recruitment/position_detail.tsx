import { useNavigate, useParams } from "react-router-dom";
import Header from "../header";
import { ArrowLeft } from "lucide-react";
import APIRequest from "../../api/request";
import { useQuery } from "react-query";
import { RecruitmentPositionType } from "../../store/types/recruitment";
import { Button, Card } from "antd";
import NoImage from './NoImage.png'

export default function RecruitmentPositionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useQuery<RecruitmentPositionType>('get-detail', async () => {
    if (id) {
      const { data } = await APIRequest({
        method: 'GET',
        path: '/api/recruitment/positions/' + id
      })
      return data
    }
  })
  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Header />
      <div className="p-6 space-y-4">
        <div className="flex gap-1 cursor-pointer items-center " onClick={() => navigate('/app')}>
          <ArrowLeft className="text-gray-400 h-5" />
          <b className="text-primary text-sm">Back</b>
        </div>
        {data && (
          <Card>
            <p className="text-gray-600">{data.type} / {data.location}</p>
            <b className="text-xl">{data.title}</b>
            <hr className="my-4" />
            <div className="grid grid-cols-3 gap-8 flex-wrap">
              <div className="col-span-2 max-md:col-span-3">
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
              <div className="max-md:col-span-3">
                <div className="space-y-4">
                  <div className="bg-gray-100 p-2 rounded">
                    <div className="bg-white w-full p-2 space-y-3">
                      <div className=" flex justify-between items-center">
                        <b>{data.company}</b>
                        {data.more_jobs && <Button
                          size="small"
                          className="bg-gray-100"
                          onClick={() => navigate(`/app?full_time=true&company=${data.company}`)}
                        >
                          <b className="text-primary">{data.more_jobs} other job</b>
                        </Button>
                        }
                      </div>
                      <hr />
                      <div>
                        <img alt="company-image" src={data.company_logo} className="w-full" />
                        {data.company_url && <a href={data.company_url}>{data.company_url}</a>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-2 rounded">
                    <div className="bg-yellow-50 w-full p-2 space-y-3">
                      <b>How to apply</b>
                      <hr />
                      <div dangerouslySetInnerHTML={{ __html: data.how_to_apply }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </Card>
        )}

      </div>
    </div>
  )
}