import React, { useEffect, useState } from 'react'
import api from '../../api';
import PaginationControls from '../../utilities/PaginationControls';
import { toast } from 'sonner';
import { formatISODateToCustom } from '../../utilities/formatterutility';

const Subscribers = () => {
    const [subscribers, setSubscribers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setlastPage] = useState(1)

    useEffect(() => {
      const fetchSubscribers = async () => {
        const loadingToast = toast.loading('Fetching subscribers...');
        try {
          const response = await api.call(`/subscribers`, 'GET');
        //   console.log(response)

          if (response.status === 200) {
            const { data, current_page, last_page } = response.data.subscribers;
            setSubscribers(data);
            setCurrentPage(current_page)
            setlastPage(last_page)
            toast.success('Subscribers fetched successfully', { id: loadingToast });
          }
        } catch (error) {
            toast.error('Failed to fetch subscribers', { id: loadingToast });
            console.error('An error occurred fetching subscribers', error);
        }
      };

      fetchSubscribers()
    }, [])
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
                <thead>
                    <tr className='border-b border-black/20'>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-start">S/N</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Name</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Email</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-end">Date Subscribed</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.map((subscriber, index) => (
                        <tr key={subscriber.id} className='last:border-b-0 border-b text-xs border-black/20'>
                            <td className="p-4 text-start">{String(index+1).padStart(3, "0")}</td>
                            <td className="p-4 text-center">{subscriber.name}</td>
                            <td className="p-4 text-center">{subscriber.email}</td>
                            <td className="p-4 text-end">{formatISODateToCustom(subscriber.created_at)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>
                            <PaginationControls 
                            currentPage={currentPage}
                            totalPages={lastPage}
                            setCurrentPage={setCurrentPage}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Subscribers