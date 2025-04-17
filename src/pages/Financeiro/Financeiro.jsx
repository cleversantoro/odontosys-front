import React from 'react';
import ContentHeader from '../../components/ContentHeader';
import './Financeiro.css'; 


const Financeiro = () => {

    return (
        <>
            <ContentHeader title="Financeiro" />

            {/* Financeiro Section */}
            <div class="card p-3 mb-4">
                <div class="mb-3">
                    <div class="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="convenio" />
                        <label class="form-check-label" for="convenio">Convênio</label>
                    </div>
                    <select class="form-select d-inline w-auto">
                        <option>Escolha</option>
                    </select>
                    <div class="form-check form-check-inline ms-3">
                        <input className="form-check-input" type="checkbox" id="particular" checked />
                        <label class="form-check-label" for="particular">Particular</label>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Orçamento Aprovado - Valor Total do Serviço:</label>
                    <input type="text" className="form-control d-inline w-auto" value="R$ 120,00" readOnly />
                    <select class="form-select d-inline w-auto ms-2">
                        <option>Profissional</option>
                    </select>
                    <select class="form-select d-inline w-auto ms-2">
                        <option>Forma de Pagamento</option>
                    </select>
                    <span class="add-link ms-2">Incluir +</span>
                </div>
            </div>

            {/* Detalhes do Pagamento */}
            <div class="section-title">Detalhes do Pagamento <span class="add-link float-end">Incluir +</span></div>

            <div class="table-responsive mt-2">
                <table class="table table-bordered table-sm align-middle text-center">
                    <thead class="table-light">
                        <tr>
                            <th>Valor (R$)</th>
                            <th>Vencimento</th>
                            <th>Forma de Pagamento</th>
                            <th>No do Documento</th>
                            <th>Financeiro</th>
                            <th>Crédito</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>120,00</td>
                            <td>12/4/2009</td>
                            <td>Boleto</td>
                            <td>123456</td>
                            <td class="text-danger">Vencido</td>
                            <td>-</td>
                            <td>120,00</td>
                        </tr>
                        <tr>
                            <td>120,00</td>
                            <td>12/5/2009</td>
                            <td>Boleto</td>
                            <td>123457</td>
                            <td class="text-warning">À Vencer</td>
                            <td>-</td>
                            <td>120,00</td>
                        </tr>
                        <tr>
                            <td>120,00</td>
                            <td>12/6/2009</td>
                            <td>Boleto</td>
                            <td>123458</td>
                            <td class="text-success">Pago</td>
                            <td>120,00</td>
                            <td>0,00</td>
                        </tr>
                        <tr>
                            <td>500,00</td>
                            <td>Em aberto</td>
                            <td>Dinheiro</td>
                            <td>0</td>
                            <td class="text-warning">À Vencer</td>
                            <td>100,00</td>
                            <td>400,00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    );

};

export default Financeiro;
