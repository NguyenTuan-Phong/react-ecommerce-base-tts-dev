import { Link } from 'react-router-dom'
import { dataWarranty } from '../data/dataWarranty'
import '../style/style.css'
const Warranty = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">CHÍNH SÁCH BẢO HÀNH</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: dataWarranty }} />
            </div>
        </div>
        
    )
}
export default Warranty