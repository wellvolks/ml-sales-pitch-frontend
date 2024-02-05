import React, {useEffect, useState} from "react";
import { NextPage } from "next";
import Image from "next/image";
import Select from "react-select";
import {Button} from "react-bootstrap";
import {Container, Row, Col, CardBody, Card, Label, Input, Form} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import dynamic from 'next/dynamic';
import {  EditorState, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
)



interface DataProps {}
interface ILabelValue {
    label: string;
    value: string;
}

const MercadoLivre: NextPage<DataProps> = ({}) => {

    const [slideId, setSlideId] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState<ILabelValue>({label: "Acessórios para Veículos", value: "Acessórios para Veículos"})
    const [selectedSubCategory, setSelectedSubCategory] = useState<ILabelValue>({label: "", value: ""})
    const [categoryOptions, setCategoryOptions] = useState<ILabelValue[]>([{label: "Acessórios para Veículos", value: "Acessórios para Veículos"}])
    const [subCategoryOptions, setSubCategoryOptions] = useState<ILabelValue[]>([])
    const [salesPitch, setSalesPitch] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [subCategoryOptionsForAceesorios, setSubCategoryOptionsForAcessorios] = useState<ILabelValue[]>([{label: "Navegadores GPS para Vehículos", value: "Navegadores GPS para Vehículos"},{label: "Outros", value: "Outros"},{label: "Ferramentas para Veículos", value: "Ferramentas para Veículos"},{label: "Peças de Carros e Caminhonetes", value: "Peças de Carros e Caminhonetes"},{label: "Peças de Motos e Quadriciclos", value: "Peças de Motos e Quadriciclos"},{label: "Performance", value: "Performance"},{label: "Som Automotivo", value: "Som Automotivo"},{label: "Peças de Linha Pesada", value: "Peças de Linha Pesada"},{label: "Acessórios Náuticos", value: "Acessórios Náuticos"},{label: "Limpeza Automotiva", value: "Limpeza Automotiva"},{label: "Aces. de Carros e Caminhonetes", value: "Aces. de Carros e Caminhonetes"},{label: "Rodas", value: "Rodas"},{label: "GNV", value: "GNV"},{label: "Segurança Veicular", value: "Segurança Veicular"},{label: "Aces. de Motos e Quadriciclos", value: "Aces. de Motos e Quadriciclos"},{label: "Peças Náuticas", value: "Peças Náuticas"},{label: "Pneus e Acessórios", value: "Pneus e Acessórios"},{label: "Tuning", value: "Tuning"},{label: "Lubrificantes e Fluidos", value: "Lubrificantes e Fluidos"},{label: "Serviços Programados", value: "Serviços Programados"},{label: "Acessórios de Linha Pesada", value: "Acessórios de Linha Pesada"},{label: "Motos", value: "Motos"},{label: "Tags de Pagamento de Pedágio", value: "Tags de Pagamento de Pedágio"}])
    const [subCategoryOptionsForConstrucao, setSubCategoryOptionsForConstrucao] = useState<ILabelValue[]>([{label: "Aberturas", value: "Aberturas"},{label: "Encanamento", value: "Encanamento"},{label: "Energia", value: "Energia"},{label: "Loja das Tintas", value: "Loja das Tintas"},{label: "Materiais de Obra", value: "Materiais de Obra"},{label: "Outros", value: "Outros"},{label: "Pisos e Rejuntes", value: "Pisos e Rejuntes"}])
    const [query, setQuery] = useState("")
    function handleChangeCategoryOption(categoryOptionChanged: ILabelValue){
        setSelectedCategory(categoryOptionChanged);
        if(categoryOptionChanged.value == "Acessórios para Veículos"){
            setSubCategoryOptions(subCategoryOptionsForAceesorios)
        }
        else{
            setSubCategoryOptions(subCategoryOptionsForConstrucao)
        }
    }
    function handleChangeSubCategoryOption(subCategoryOptionChanged: ILabelValue){
        setSelectedSubCategory(subCategoryOptionChanged);
    }

    function handleGetSalesPitch(){
        setIsSubmitting(true);
        getSalesPitch();
    }

    function handleChangeQuery(queryChanged: React.SetStateAction<string>){
        setQuery(queryChanged);
    }

    const createState = (text: any) => {
        return EditorState.createWithContent(ContentState.createFromText(text));
    };

    // @ts-ignore
    const ControlledEditor = ({ htmlContent }) => {
        // define the local state, using the createState callback to create the initial value
        const [editorState, setEditorState] = useState(createState(htmlContent));

        // override the local state any time that the props change
        useEffect(() => {
            setEditorState(createState(htmlContent));
        }, [htmlContent]);

        return (
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
            />
        );
    };

    function getSalesPitch(){
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'category': selectedCategory.value,
                'subCategory': selectedSubCategory.value,
                'query': query,
                "Access-Control-Allow-Origin": "*"
            }
        };

        console.log(requestOptions)

        async function getSalesPitchInfo() {
            const res = await fetch('http://localhost:8000/ml/prompt/ans', requestOptions)
            // const res = await fetch('https://open-api.gogeo.io/ml/prompt/ans', requestOptions)

            if (res.ok){
                let json_resp = await res.json();

                console.log(json_resp);

                setSalesPitch(json_resp);

            }
            setIsSubmitting(false);
        }

        getSalesPitchInfo();
    }

    function  abc(){
        const url = 'https://wa.me//5562982040461?text=' + encodeURI(salesPitch)

        console.log(url);

        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <Container>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Image src={require('../../assets/imgs/llm.png')} alt={'img'} quality="100" width={350} height={350}>
                </Image>
            </div>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <div style={{paddingTop: "20px", width: "1180px"}}>
                        <Select
                            // value={selectedCategory}
                            onChange={(e: unknown) => {handleChangeCategoryOption(e as ILabelValue)}}
                            options={categoryOptions}
                            classNamePrefix="select2-selection"
                            placeholder={'Selecione uma categoria'}
                        />
                    </div>
                </Row>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <div style={{paddingTop: "30px", width: "1180px"}}>
                        <Select
                            value={selectedSubCategory}
                            onChange={(e: unknown) => {handleChangeSubCategoryOption(e as ILabelValue)}}
                            options={subCategoryOptions}
                            classNamePrefix="select2-selection"
                            placeholder={'Selecione uma sub categoria'}
                        />
                    </div>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center"}}>
                    <div style={{paddingTop: "20px", width: "1180px"}}>
                        <input
                            className="form-control"
                            id="job-name"
                            type="text"
                            defaultValue=""
                            onChange={e => {handleChangeQuery(e.target.value)}}
                            value={query}
                            required
                            placeholder={'Informe uma lista de produtos'}
                        />
                    </div>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center"}}>
                    <div style={{paddingTop: "20px", width: "250px", }}>
                    <Button active={!isSubmitting} color="warning" onClick={handleGetSalesPitch}> Criar um discurso de vendas</Button>{" "}
                    </div>
                    <div style={{paddingTop: "20px", width: "350px", }}>
                    <Button style={{backgroundColor: "green"}} active={!isSubmitting} onClick={abc}> Enviar mensagem pelo WhatsApp</Button>{" "}
                    </div>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center"}}>
                    <div style={{paddingTop: "20px", width: "1180px"}}>
                        <ControlledEditor htmlContent={salesPitch} />
                        {/*<Form method="post">*/}
                        {/*    <Editor*/}
                        {/*        toolbarClassName="toolbarClassName"*/}
                        {/*        wrapperClassName="wrapperClassName"*/}
                        {/*        editorClassName="editorClassName"*/}
                        {/*    />*/}
                        {/*</Form>*/}
                    </div>
                </Row>
        </Container>
    )
}

export default MercadoLivre;