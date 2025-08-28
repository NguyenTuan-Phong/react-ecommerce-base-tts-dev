import { Link } from 'react-router-dom'
import {data_feedback } from '../data/data_Support';
const SupportBy = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">GÓP Ý, KHIẾU NẠI</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: data_feedback }} />
            </div>
        </div>
        
    )
}
export default SupportBy