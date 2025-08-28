import { Link } from 'react-router-dom'
import { data_Buy } from '../data/data_Support'
const SupportBy = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">HƯỚNG DẪN MUA HÀNG TRỰC TIẾP</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: data_Buy }} />
            </div>
        </div>
        
    )
}
export default SupportBy