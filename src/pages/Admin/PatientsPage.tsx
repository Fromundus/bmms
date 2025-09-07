import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MoreVertical, Plus, PlusCircle, Save, Shield, Trash, User as UserIcon, UserCheck, Search, CarFront, Eye, Pen, PenBoxIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import User from "@/types/User";
// import AddAdmin from "./add-modals/AddAdmin";
// import AddUser from "./add-modals/AddUser";
import api from "@/api/axios";
import AddUser from "@/components/custom/add-modals/AddUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Modal from "@/components/custom/Modal";
import ButtonWithLoading from "@/components/custom/ButtonWithLoading";
import Patient from "@/types/Patient";
import { format } from "date-fns";
import PatientStatusBadge from "@/components/custom/PatientStatusBadge";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search); // new
  const [loading, setLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [fetchTotal, setFetchTotal] = useState();

  const [counts, setCounts] = useState({
    total: 0,
    superadmin: 0,
    admin: 0,
    driver: 0,
  });

  const [wfa, setWfa] = useState("");
  const [hfa, setHfa] = useState("");
  const [wfltht, setWfltht] = useState("");
  const [status, setStatus] = useState("");
  
  // console.log(counts);

  const fetchUsers = async (searchQuery = debouncedSearch) => {
    setLoading(true);

    try {
      const res = await api.get(`/patients`, {
        params: { 
          page, 
          per_page: perPage, 
          search: searchQuery,
          wfa: wfa,
          hfa: hfa,
          wfltht: wfltht,
          status: status,
        },
      });
      console.log(res);
      setPatients(res.data.patients.data);
      setTotalPages(res.data.patients.last_page);
      setFetchTotal(res.data.patients.total);
      setCounts(res.data.counts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  // Fetch when page or search changes
  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch, wfa, hfa, wfltht, status]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 1000); // 1 second debounce

    return () => clearTimeout(handler);
  }, [search]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === patients.length) {
      setSelected([]);
    } else {
      setSelected(patients.map((u) => u.id));
    }
  };

  const bulkDelete = async () => {
    if (!selected.length) return;
    setLoading(true);
    
    try {
      await api.delete("/patients", { data: { ids: selected } });

      toast({
        title: "Deleted Successfully",
      });

      setSelected([]);
      setDeleteModal(false);
      fetchUsers();

    } catch (err) {
      console.log(err);
      toast({
        title: err.response.status,
        description: err.response.data.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Search + Bulk Actions */}
      <div className="flex gap-6 flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Patient Management</h2>
          <p className="text-muted-foreground">Manage patients</p>
        </div>
        <div className="space-x-4">
          <Link to={'add'}>
            <Button>
              <Plus /> Add Patient
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col w-full lg:justify-between lg:flex-row gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
              <Select value={wfa} onValueChange={setWfa} disabled={loading}>
                <SelectTrigger className="w-full min-w-[60px]">
                  <SelectValue placeholder="WFA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Underweight">Underweight</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Overweight">Overweight</SelectItem>
                </SelectContent>
              </Select>

              <Select value={hfa} onValueChange={setHfa} disabled={loading}>
                <SelectTrigger className="w-full min-w-[60px]">
                  <SelectValue placeholder="HFA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Stunted">Stunted</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Tall">Tall</SelectItem>
                </SelectContent>
              </Select>

              <Select value={wfltht} onValueChange={setWfltht} disabled={loading}>
                <SelectTrigger className="w-full min-w-[60px]">
                  <SelectValue placeholder="WFLTHT" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Wasted">Wasted</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="Obese">Obese</SelectItem>
                </SelectContent>
              </Select>

              <Select value={status} onValueChange={setStatus} disabled={loading}>
                <SelectTrigger className="w-full min-w-[60px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="At Risk">At Risk</SelectItem>
                  <SelectItem value="Healthy">Healthy</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="w-full flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
            <CardTitle>
              Patient Directory
            </CardTitle>
              <div className="flex items-center gap-2">
                  <>
                    <Modal disabled={selected.length === 0 || loading} title="Delete Accounts" buttonLabel={<Trash />} buttonClassName="w-10 h-10 bg-destructive text-white hover:bg-destructive/50" open={deleteModal} setOpen={setDeleteModal}>
                      <p>Are you sure you want to delete?</p>
                      <div className="w-full grid grid-cols-2 gap-2">
                        <ButtonWithLoading className="w-full" loading={loading} disabled={loading || selected.length === 0} onClick={bulkDelete}>
                          Yes
                        </ButtonWithLoading>
                        <Button variant="outline" onClick={() => setDeleteModal(false)}>
                          Cancel
                        </Button>
                      </div>
                    </Modal>

                    {/* <IconButton variant="destructive" onClick={bulkDelete} disabled={selected.length === 0 || loading}>
                      <Trash />
                    </IconButton> */}
                  </>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selected.length === patients.length && patients.length > 0}
                    onCheckedChange={selectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Sex</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Belongs to IP Group</TableHead>
                <TableHead>Birthday</TableHead>
                <TableHead>Date Measured</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Height</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Weight for Age Status</TableHead>
                <TableHead>Height for Age Status</TableHead>
                <TableHead>Weight for Lt/Ht Status</TableHead>
                <TableHead>Last Checkup</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={17} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : patients.length > 0 ? (
                patients.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(u.id)}
                        onCheckedChange={() => toggleSelect(u.id)}
                      />
                    </TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.sex}</TableCell>
                    <TableCell>{u.address}</TableCell>
                    <TableCell>{u.belongs_to_ip}</TableCell>
                    <TableCell>{format(new Date(u.birthday), "Pp")}</TableCell>
                    <TableCell>{format(new Date(u.latest_record.date_measured), "Pp")}</TableCell>
                    <TableCell>{u.latest_record.weight}</TableCell>
                    <TableCell>{u.latest_record.height}</TableCell>
                    <TableCell>{u.latest_record.age}</TableCell>
                    <TableCell><PatientStatusBadge status={u.latest_record.weight_for_age} /></TableCell>
                    <TableCell><PatientStatusBadge status={u.latest_record.height_for_age} /></TableCell>
                    <TableCell><PatientStatusBadge status={u.latest_record.weight_for_ltht_status} /></TableCell>

                    <TableCell>{format(new Date(u.latest_record.updated_at), "PP")}</TableCell>
                    <TableCell><PatientStatusBadge status={u.latest_record.status} /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link to={`${u.id}`}>
                          <Button variant="ghost">
                            <Eye />
                          </Button>
                        </Link>
                        <Link to={`edit/${u.id}`}>
                          <Button variant="ghost">
                            <PenBoxIcon />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={17} className="text-center">
                    No Patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="flex items-center justify-between gap-4 w-full mt-4">
            <span className="text-sm text-muted-foreground">{selected.length} of {fetchTotal} row(s) selected.</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <span className="px-4 text-sm flex items-center bg-background border p-2 rounded">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  );
}

