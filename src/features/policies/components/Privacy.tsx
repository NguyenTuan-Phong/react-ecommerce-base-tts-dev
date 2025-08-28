import { Link } from 'react-router-dom'
import { dataPrivacy } from '../data/dataPrivacy'
import '../style/style.css'
const Privacy = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">CHÍNH SÁCH XỬ LÝ KHIẾU NẠI</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: dataPrivacy }} />
            </div>
        </div>
        
    )
}
export default Privacy