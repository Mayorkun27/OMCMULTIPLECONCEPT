import React, { useEffect, useState } from 'react'
import PaginationControls from '../../utilities/PaginationControls'
import api from '../../api'
import { toast } from 'sonner'
import { formatISODateToCustom } from '../../utilities/formatterutility'
import Modal from '../../components/modals/Modal'
import { MdRemoveRedEye, MdDelete } from 'react-icons/md'

const ManageContact = () => {
    const [contacts, setContacts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setlastPage] = useState(1)
    const [selectedContact, setSelectedContact] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        const fetchContacts = async () => {
            const loadingToast = toast.loading('Fetching contacts...');
            try {
                const response = await api.call(`/contact`, 'GET');
                console.log(response)

                if (response.status === 200) {
                    const { data, current_page, last_page } = response.data.data;
                    setContacts(data);
                    setCurrentPage(current_page)
                    setlastPage(last_page)
                    toast.success('Contacts fetched successfully', { id: loadingToast });
                }
            } catch (error) {
                toast.error('Failed to fetch contacts', { id: loadingToast });
                console.error('An error occurred fetching contacts', error);
            }
        };

        fetchContacts()
    }, [])

    const handleDeleteContact = async (contactId) => {
        setIsDeleting(true);
        try {
            await api.call(`/contact/${contactId}`, 'DELETE');
            toast.success('Contact deleted successfully');
            setContactToDelete(null)
            setContacts(contacts.filter(p => p.id !== contactId));
        } catch (error) {
            toast.error('Failed to delete contact');
            console.error('An error occurred deleting the contact', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
                <thead>
                    <tr className='border-b border-black/20'>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-start">S/N</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Name</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Email</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Message</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-center">Date Sent</th>
                        <th className="p-4 uppercase font-[Montserrat]! font-semibold! text-dark/80 text-xs text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={contact.id} className='last:border-b-0 border-b text-xs border-black/20'>
                            <td className="p-4 text-start">{String(index+1).padStart(3, "0")}</td>
                            <td className="p-4 text-center">{`${contact.first_name} ${contact.last_name}`}</td>
                            <td className="p-4 text-center">{contact.email}</td>
                            <td className="p-4 text-center">
                                <p className='line-clamp-1'>{contact.message}</p>
                            </td>
                            <td className="p-4 text-center">{formatISODateToCustom(contact.created_at)}</td>
                            <td className="p-4 text-xs">
                                <div className="flex items-center justify-end gap-2">
                                <button
                                    onClick={() => setSelectedContact(contact)}
                                    className="cursor-pointer bg-primary text-white text-md h-8 w-8 flex items-center justify-center rounded"
                                >
                                    <MdRemoveRedEye />
                                </button>
                                <button
                                    onClick={() => setContactToDelete(contact)}
                                    className="cursor-pointer bg-red-500 text-white text-md h-8 w-8 flex items-center justify-center rounded"
                                >
                                    <MdDelete />
                                </button>
                                </div>
                            </td>
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

            {selectedContact && (
                <Modal onClose={() => setSelectedContact(null)}>
                    <div className='space-y-2'>
                        <p><strong>Customer Name:</strong> {selectedContact.first_name} {selectedContact.last_name}</p>
                        <p><strong>Email:</strong> {selectedContact.email}</p>
                        <p><strong>Message:</strong> {selectedContact.message}</p>
                        <p><strong>Date:</strong> {formatISODateToCustom(selectedContact.created_at)}</p>
                    </div>
                </Modal>
            )}

            {contactToDelete && (
                <Modal onClose={() => setContactToDelete(null)}>
                    <div>
                        <h2 className="text-xl font-bold mb-4">Delete {contactToDelete.first_name} {contactToDelete.last_name}?</h2>
                        <p>Are you sure you want to delete this contact?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setContactToDelete(null)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                            <button 
                                onClick={() => handleDeleteContact(contactToDelete.id)} 
                                className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isDeleting}
                            >{isDeleting ? 'Deleting...' : 'Delete'}</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ManageContact