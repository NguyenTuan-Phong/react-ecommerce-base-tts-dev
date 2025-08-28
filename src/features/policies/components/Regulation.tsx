// import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom'
import { data } from '../data/dataRegulation'
import '../style/style.css'
const Regulation = () => {

    return(
        <div className='py-10'>
            <section className="flex gap-3">
                <Link to="/" className="link">TRANG CHỦ</Link>
                <div className="section-text">/</div>
                <span className="cursor-default section-text">CHÍNH SÁCH, QUY ĐỊNH CHUNG</span>
            </section>
            <div className='bg-white my-5 rounded-[5px] p-10'>
                <div dangerouslySetInnerHTML={{ __html: data }} />
            </div>
        </div>
        
    )
}
export default Regulation